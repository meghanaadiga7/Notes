import Card from "./Card";
import trash from "/trash.png";
function Note(props) {
	const deleteHandler = function (id) {
		props.onSelect(id);
	};

	return (
		<Card className="note-list">
			<li
				key={props.id}
				onClick={(e) => {
					e.stopPropagation();
					props.onStrike(props.id);
				}}
				className={props.click === true ? "strike" : ""}>
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
