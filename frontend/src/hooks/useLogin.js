import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useLogin() {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		const success = handleInputErrors({
			username,
			password,
		});
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch(
				"https://chatme-qafa.onrender.com/api/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, password }),
				}
			);

			const data = await res.json();

			if (data.error) {
				throw new Error(data.error);
			}

			// Set the JWT token in a cookie named "jwt"
			document.cookie = `jwt=${data.token}; max-age=${
				15 * 24 * 60 * 60
			}; path=/; samesite=strict`;

			// Set the authenticated user in the context
			setAuthUser(data);

			// Optional: Redirect the user to a different page after successful login
			// history.push("/dashboard");
		} catch (error) {
			console.log(error);
			toast.error(error.message || "An error occurred during login");
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
}

export default useLogin;

function handleInputErrors({ username, password }) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (username.length === 0) {
		toast.error("Enter Passwords");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}

// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

// function useLogin() {
// 	const [loading, setLoading] = useState(false);
// 	const { setAuthUser } = useAuthContext();

// 	const login = async (username, password) => {
// 		const success = handleInputErrors({
// 			username,
// 			password,
// 		});
// 		if (!success) return;

// 		setLoading(true);
// 		try {
// 			const res = await fetch("http://localhost:5000/api/auth/login", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({ username, password }),
// 			});

// 			const data = await res.json();

// 			if (data.error) {
// 				throw new Error(data.error);
// 			}

// 			localStorage.setItem("chat-user", JSON.stringify(data));
// 			setAuthUser(data);
// 		} catch (e) {
// 			console.log(e);
// 			toast.error(e);
// 		} finally {
// 			setLoading(true);
// 		}
// 	};

// 	return { loading, login };
// }

// export default useLogin;

// function handleInputErrors({ username, password }) {
// 	if (!username || !password) {
// 		toast.error("Please fill in all fields");
// 		return false;
// 	}

// 	if (username.length === 0) {
// 		toast.error("Enter Passwords");
// 		return false;
// 	}

// 	if (password.length < 6) {
// 		toast.error("Password must be at least 6 characters");
// 		return false;
// 	}

// 	return true;
// }
