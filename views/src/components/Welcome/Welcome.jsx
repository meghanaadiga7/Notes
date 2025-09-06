import "./Welcome.css";
function Welcome(){
return (
    <section className="main">
        <div className="welcome">
            <h1>List better with Lists</h1>
            <p>Get your work done with Lists</p>
        </div>

        <div className="buttons">
            <button className="btn signup">Sign Up</button>
            <button className="btn login">Login</button>
        </div>
    </section>
)
}

export default Welcome;