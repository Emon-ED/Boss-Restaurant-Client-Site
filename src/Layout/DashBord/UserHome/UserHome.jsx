import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const UserHome = () => {
    const {user} = useContext(AuthContext);
    console.log(user)
    return (
        <div className="h-full">
            <h1 className="text-3xl font-bold">
                <span className="mr-3">Hi, Welcome</span>  
                 {
                    user. displayName ? user.displayName : 'Back'
                }
                </h1>
        </div>
    );
};

export default UserHome;