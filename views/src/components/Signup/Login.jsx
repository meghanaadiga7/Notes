import "./Signup.css";
import LoginForm from "./LoginForm";
function Login(){
    return (<section className="signup-main">
        <div className="left"></div>
        <div className="right">
            <h1>Welcome back</h1>
            <p>Please enter your account details</p>
            <LoginForm></LoginForm>
        </div>
    </section>)
}

export default Login;