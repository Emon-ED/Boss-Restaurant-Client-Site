import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const axiosPublic = useAxiosPublic();

// Create a user by email ----------------------------
const createUser =(email,pass)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,pass);
}
// Sign In a user by email ----------------------------
const signInUser = (email,pass)=>{
    setLoading(true);
return signInWithEmailAndPassword(auth,email,pass);
};

// Google Sign In---------------------
const provider = new GoogleAuthProvider();
const googleSignIn = ()=>{
    setLoading(true);
    return signInWithPopup(auth , provider)
}

// LogOut a user ----------------------------
const logOut =()=>{
    setLoading(true);
    return signOut(auth);
}

// On State Change ----------------------------
    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email: currentUser?.email};
                axiosPublic.post('/jwt',userInfo)
                
                .then(res=>{
                   if(res.data.token){
                    localStorage.setItem('access-token',res.data.token);
                    setLoading(false);  
                }
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        })
        return()=>{
            unsubscribe();
        }
    },[]);
    
    const authInfo ={
        user,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        logOut
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;