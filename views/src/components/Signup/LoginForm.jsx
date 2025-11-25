import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginForm() {
	const navigate = useNavigate();

	const [userInput, setUserInput] = useState({
		email: "",
		password: "",
	});

	const inputHandler = function (e) {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value,
		});
	};

	const loginHandler = async function (e) {
		e.preventDefault();
		let data;
		try {
			const res = await fetch("http://localhost:8087/api/v1/notes/users/login", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(userInput),
			});
			data = await res.json();
			if (res.ok) {
				localStorage.setItem("jwt", data.token);
				navigate("/noteset");
			} else {
				console.log(data);
				alert(`${data.message}.Login failed`);
			}
		} catch (err) {
			console.log(err);
			alert("Something went wrong");
		}
	};

	return (
		<form onSubmit={loginHandler}>
			<div className="form-first">
				<label htmlFor="email">Email </label>
				<input
					autoComplete="off"
					type="email"
					id="email"
					required
					placeholder="Please enter your email"
					name="email"
					value={userInput.email}
					onChange={inputHandler}></input>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					required
					name="password"
					value={userInput.password}
					onChange={inputHandler}
					placeholder="Please enter your password"></input>
				<a href="" className="forgot-password">
					Forgot Password?
				</a>
			</div>
			<div className="form-second">
				<button type="submit" className="form-button">
					Log in
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
