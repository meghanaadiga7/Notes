import { useState } from "react";
function NoteTitleModel({ el, onCancel, onSubmit }) {
	const [newTitle, setNewTitle] = useState(el.noteSetTitle);

	const newTitleHandler = function (e) {
		e.preventDefault();
		setNewTitle(e.target.value);
	};

	const submitNewTitle = function () {
		onCancel();
		onSubmit(newTitle);
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<input
					onChange={newTitleHandler}
					className="modal-input"
					type="text"
					placeholder="Enter note set name"></input>
				<div className="modalButtons">
					<button onClick={submitNewTitle} className="modal-button">
						Submit
					</button>
					<button onClick={onCancel} className="modal-button">
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default NoteTitleModel;
