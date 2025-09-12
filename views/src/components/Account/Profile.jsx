function Profile(){
    return (<section>
        <form className="account-form">
            <label htmlFor="user">User</label>
            <input type="text" required id="user" ></input>
            <label htmlFor="email">Email</label>
            <input type="email" required id="email" ></input>
            <img src="./default.jpg" alt="User-image"></img>
            <input type="file" accept="image/*" id="profile" className="account-profile"></input>
            
        </form>
        <div>
            <button className="account-btn"> Back</button>
            <button className="account-btn">Update Profile</button>
        </div>
</section>
)
}

export default Profile;