import "./Signup.css";
function ForgotPassword(){
    return(
        <section className="signup-main">
        <div className="left"></div>
        <div className="right">
        <form>
            <div className="form-first">
                <h1>Forgot Password?</h1>
                <p>No worries, we'll send you a token to your email to reset</p>
                <label htmlFor="email">Email</label>
                <input type="email" required placeholder="Enter your email" id="email"></input>
            </div>
            <div className="form-second">
                <button className="form-button" type="submit">Send Token</button>
                <p> Back to <span><a className="anchor" href=""> log in</a></span></p>
            </div>
        </form>
        </div>
        </section>
    )
}

export default ForgotPassword;