import "./Signup.css";
import SignupForm from "./SignupForm";
function Signup(){
    return (
        <section className="signup-main">
            <div className="left"></div>
            <div className="right">
                <h1>Sign Up An Account</h1>
                <p> Enter personal details to create your account</p>
                <SignupForm></SignupForm>
            </div>
        </section>
    )
}

export default Signup;