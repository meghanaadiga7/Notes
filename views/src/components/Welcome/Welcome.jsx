import "./Welcome.css";
import {useNavigate} from "react-router-dom";
function Welcome(){
    const navigate=useNavigate();
    return (
    <section className="main">
        <div className="welcome">
            <h1>List better with Lists</h1>
            <p>Declutter with Lists</p>
        </div>

        <div className="buttons">
            <button onClick={()=>navigate("/signup")} className="btn signup">Sign Up</button>
            <button onClick={()=>navigate("/login")} className="btn login">Login</button>
        </div>
    </section>
)
}

export default Welcome;