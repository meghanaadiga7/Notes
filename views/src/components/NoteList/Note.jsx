import Card from "./Card";
import { useState } from "react";
import trash from "/trash.png";
function Note(props) {
	const [clicked, setClicked] = useState(false);

	const clickHandler = function () {
		setClicked((click) => !click);
	};

	const deleteHandler = function (id) {
		props.onSelect(id);
	};

	return (
		<Card className="note-list">
			<li
				key={props.id}
				onClick={(e) => {
					e.stopPropagation();
					clickHandler();
				}}
				className={clicked === true ? "strike" : ""}>
				{props.title}
			</li>
			<button
				onClick={(e) => {
					e.stopPropagation();
					deleteHandler(props.id);
				}}>
				<img src={trash} alt="delete" className="delete-note"></img>
			</button>
		</Card>
	);
}

export default Note;
