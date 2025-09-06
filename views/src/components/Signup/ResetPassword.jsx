import "./Signup.css";

function ResetPassword(){
    return (
        <section className="signup-main">
            <div className="left"></div>
            <div className="right">
                <form>
                    <div className="form-first">
                        <h1>Create your new password</h1>
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" required id="newPassword" placeholder="Enter your password" minLength="8"></input>
                        <label html="confirmNewPass">Confirm Password</label>
                        <input type="password" required id="confirmNewPass" placeholder="Confirm your password" minLength="8"></input>
                    </div>
                    <div className="form-second">
                        <button className="form-button" type="submit">Reset Password</button>
                        <p> Back to <span><a className="anchor" href=""> log in</a></span></p>
                    </div>
                </form> 
            </div>
        </section>
    )
}

export default ResetPassword;