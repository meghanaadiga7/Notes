function Password(){
    return <section>
        <form className="account-form">
            <label htmlFor="oldPassword">Password</label>
            <input type="password" id="oldPassword" required></input>
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" required></input>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" required></input>
        </form>
        <div>
            <button className="account-btn">Update Password</button>
        </div>
    </section>
}

export default Password;