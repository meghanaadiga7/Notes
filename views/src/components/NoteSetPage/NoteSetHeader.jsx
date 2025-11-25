import "./NoteSet.css";
import { useNavigate } from "react-router-dom";
function NoteSetHeader() {
	const navigate = useNavigate();
	async function logoutHandler(e) {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:8087/api/v1/notes/users/logout");
			const data = await res.json();
			if (res.ok) {
				localStorage.removeItem("jwt");
				navigate("/");
			} else {
				console.log(data.message);
				alert(data.message || "Logout failed");
			}
		} catch (err) {
			console.log(err);
			alert("Something went wrong!Try again");
		}
	}

	return (
		<section className="note-header">
			<div className="note-container">
				<button onClick={logoutHandler} className="note-btn">
					Logout
				</button>
			</div>
		</section>
	);
}

export default NoteSetHeader;
