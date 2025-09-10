import "./NoteSet.css";
function NoteSetHeader(){
    return (
    <section className="note-header">
        <div className="note-container">
            <button className="note-btn">Logout</button>
            <img className="user-image" src="./default.jpg" alt="user-image"></img>
            <button className="note-btn">User</button>
        </div>
    </section>
    )
}

export default NoteSetHeader;