import "./Account.css";
import Profile from "./Profile";
import Password from "./Password";
function Account(){
   return (<section className="account-main">
    <div className="first-account"></div>
    <div className="second-account">
      <Profile></Profile>
      <Password></Password>
    </div>
   </section>)
}

export default Account;