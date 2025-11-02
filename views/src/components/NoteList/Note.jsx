import Card from "./Card";
import { useState } from "react";
function Note(props){

    const [clicked,setClicked]=useState(false);

    const clickHandler=function(){
        setClicked(click=>!click);
    }

    return <Card className="note-list">
    <li onClick={clickHandler} className={clicked===true? "strike" :""}>
        {props.title}
    </li>
    </Card>
}

export default Note;