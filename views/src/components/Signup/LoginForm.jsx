function LoginForm(){
    return (<form>
        <div className="form-first">
            <label htmlFor="email">Email </label>
            <input type="email" id="email" required placeholder="Please enter your email"></input>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required placeholder="Please enter your password"></input>
            <a href="" className="forgot-password">Forgot Password?</a>
        </div>  
        <div className="form-second">
            <button type="submit" className="form-button">Log in</button>
        </div>
    </form>

    )
}

export default LoginForm;