import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import SectionTitles from "../../../pages/SharedPages/sectiontitles/SectionTitles";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
    return (
        <div className="h-screen">
            <SectionTitles heading={'payment'} subHeading={'payment to eat'}></SectionTitles>
            <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
            </div>
        </div>
    );
};

export default Payment;