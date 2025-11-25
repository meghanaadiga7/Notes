import Card from "./Card";
import { useState, useEffect } from "react";
import "./NoteList.css";
import { useParams } from "react-router-dom";
import Note from "./Note";

function NoteList() {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const token = localStorage.getItem("jwt");
	const { id } = useParams();

	const deleteTask = async function (noteid) {
		try {
			const res = await fetch(
				`http://localhost:8087/api/v1/notes/notesSet/${id}/notesList/${noteid}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (!res.ok) throw new Error("Couldn't delete note. Try again!");
			const updatedArr = notes.filter((el) => el._id != noteid);
			setNotes(updatedArr);
		} catch (err) {
			alert(err);
		}
	};

	const notesList = notes.map((el) => (
		<Note key={el._id} id={el._id} onSelect={deleteTask} title={el.noteName}></Note>
	));

	const submitNewTask = function (e) {
		setNewNote(e.target.value);
	};

	const addNewTask = async function () {
		try {
			const res = await fetch(`http://localhost:8087/api/v1/notes/notesSet/${id}/notesList`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					noteName: newNote,
				}),
			});
			if (!res.ok) throw new Error("Couldn't create a note. Enter the note title!");
			const data = await res.json();
			setNotes((prev) => [
				...prev,
				{
					_id: data.data.note._id,
					noteName: data.data.note.noteName,
					noteSetID: data.data.note.noteSetID,
				},
			]);
			setNewNote("");
		} catch (err) {
			alert(err);
		}
	};

	const getAllNotes = async function () {
		try {
			const res = await fetch(`http://localhost:8087/api/v1/notes/notesSet/${id}/notesList`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();
			setNotes(data.data.notes);
			if (!res.ok) {
				throw new Error("Couldn't load the notes. Try later");
			}
		} catch (err) {
			alert(err);
		}
	};

	useEffect(() => {
		getAllNotes();
	}, []);

	return (
		<section className="note-section">
			<input
				autoFocus
				value={newNote}
				onChange={submitNewTask}
				placeholder="Enter your task"
				type="text"></input>
			<button onClick={addNewTask}>Add</button>
			<Card className="note-card">
				<ul>{notesList}</ul>
			</Card>
		</section>
	);
}

export default NoteList;
