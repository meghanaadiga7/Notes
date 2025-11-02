import Card from "./Card";
import "./NoteList.css";
import Note from "./Note";

function NoteList(){
    const notes=["Dance","Sing","Workout"].map((el,i)=><Note key={i} title={el}></Note>);

    return (
        <section className="note-section">
            <input type="text"></input>
            <button>Add</button>
            <Card className="note-card">
               <ul>
                {notes}
               </ul>
            </Card>
        </section>
    )
}

export default NoteList;
