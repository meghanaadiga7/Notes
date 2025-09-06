import "./Signup.css";
function SignupForm(){
    return (<form>
        <div className="form-first">
            <label htmlFor="username">Username</label>
            <input type="text" required placeholder="Enter username" id="username"></input>
            <label htmlFor="email">Email</label>
            <input type="email" required placeholder="Enter email address" id="email"></input>
            <label htmlFor="password">Password</label>
            <input type="password" required placeholder="Enter your password" minLength="8" id="password"></input>
            <label htmlFor="passwordConfirm">Confirm your Password</label>
            <input type="password" required placeholder="Confirm your password" id="passwordConfirm"></input>
        </div>
        <div className="form-second">
            <button type="submit" className="form-button">Sign Up</button>
            <p>Already have an account? <span><a className="anchor" href="">Log in</a></span></p>
        </div>
    </form>)
}

export default SignupForm;