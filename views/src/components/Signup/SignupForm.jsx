import "./Signup.css";
import Alert from "../Welcome/Alert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function SignupForm() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const handleForm = function (e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async function (e) {
		e.preventDefault();
		let data;
		try {
			const res = await fetch("http://localhost:8087/api/v1/notes/users/signup", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(formData),
			});
			data = await res.json();
			if (res.ok) {
				navigate("/noteset");
			} else {
				alert(data.message);
			}
		} catch (err) {
			console.log(err);
			alert("Something went wrong");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-first">
				<label>Username</label>
				<input
					autoComplete="off"
					type="text"
					required
					placeholder="Enter username"
					name="name"
					value={formData.name}
					onChange={handleForm}></input>
				<label>Email</label>
				<input
					autoComplete="off"
					type="email"
					required
					placeholder="Enter email address"
					name="email"
					value={formData.email}
					onChange={handleForm}></input>
				<label>Password</label>
				<input
					autoComplete="off"
					type="password"
					required
					placeholder="Enter your password"
					minLength="8"
					name="password"
					value={formData.password}
					onChange={handleForm}></input>
				<label>Confirm your Password</label>
				<input
					autoComplete="off"
					type="password"
					required
					placeholder="Confirm your password"
					name="passwordConfirm"
					value={formData.passwordConfirm}
					onChange={handleForm}></input>
			</div>
			<div className="form-second">
				<button type="submit" className="form-button">
					Sign Up
				</button>
				<p>
					Already have an account?{" "}
					<span>
						<a className="anchor" href="" onClick={() => navigate("/login")}>
							Log in
						</a>
					</span>
				</p>
			</div>
		</form>
	);
}

export default SignupForm;
