import "./NoteSet.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NoteSetHeader from "./NoteSetHeader";
import NoteTitleModel from "./NoteTitleModel";
import trash from "/trash.png";
function NoteSetPage() {
	const navigate = useNavigate();
	const [noteSets, setNoteSets] = useState([]);
	const [editing, setEditing] = useState(false);
	const [editingEl, setEditingEl] = useState("");
	const token = localStorage.getItem("jwt");

	const deleteNoteSet = async function (id) {
		try {
			const res = await fetch(`http://localhost:8087/api/v1/notes/notesSet/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (!res.ok) throw new Error("Failed to delete. Try again later");
			const updatedArr = noteSets.filter((el) => el._id != id);
			setNoteSets(updatedArr);
		} catch (err) {
			alert(err);
		}
	};

	const notes = noteSets.map((el) => {
		return (
			<li key={el._id}>
				<button onClick={() => getNoteList(el._id)} className="noteset-button">
					{el.noteSetTitle}
					<div
						onClick={(e) => {
							e.stopPropagation();
							setEditingEl(el);
							setEditing(true);
						}}
						className="noteset-update">
						...
					</div>
					<div
						onClick={(e) => {
							e.stopPropagation();
							deleteNoteSet(el._id);
						}}>
						<img src={trash} alt="delete-icon" className="noteset-delete"></img>
					</div>
				</button>
			</li>
		);
	});

	const getNoteList = function (id) {
		navigate(`/notelist/${id}`);
	};

	const getNoteSets = async function () {
		try {
			const res = await fetch("http://localhost:8087/api/v1/notes/notesSet", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (!res.ok) throw new Error("Couldn't load the note sets.Try again later!");
			const data = await res.json();
			const derivedData = data.data.notesSet;
			setNoteSets([...derivedData]);
		} catch (err) {
			alert(err);
		}
	};

	useEffect(() => {
		getNoteSets();
	}, []);

	const createNoteSets = async function () {
		try {
			const res = await fetch("http://localhost:8087/api/v1/notes/notesSet", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (!res.ok) throw new Error("Couldn't create the note set. Try again later");
			const data = await res.json();
			const newNote = data.data.newNotesSet;
			setNoteSets((prevNotes) => [newNote, ...prevNotes]);
		} catch (err) {
			alert(err);
		}
	};

	const submitTitle = async function (newTitle) {
		try {
			const res = await fetch(`http://localhost:8087/api/v1/notes/notesSet/${editingEl._id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					noteSetTitle: newTitle,
				}),
			});
			if (!res.ok) throw new Error("Couldn't update the title of the note set. Try again later");
			setNoteSets((prevNote) => {
				return prevNote.map((el) =>
					el._id == editingEl._id ? { ...el, noteSetTitle: newTitle } : el
				);
			});
		} catch (err) {
			alert(err);
		}
	};

	const cancelModel = function () {
		setEditing(false);
	};

	return (
		<div className="note-main">
			<NoteSetHeader></NoteSetHeader>
			{editing && (
				<NoteTitleModel
					el={editingEl}
					onCancel={cancelModel}
					onSubmit={submitTitle}></NoteTitleModel>
			)}
			<div className="note-set">
				{notes}
				<button onClick={createNoteSets} className="noteset-button">
					+
				</button>
			</div>
		</div>
	);
}

export default NoteSetPage;
