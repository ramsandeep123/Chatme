import { useState } from "react";

import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({
		fullName,
		username,
		password,
		confirmPassword,
		gender,
	}) => {
		const success = handleInputErrors({
			fullName,
			username,
			password,
			confirmPassword,
			gender,
		});
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("http://localhost:5000/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fullName,
					username,
					password,
					confirmPassword,
					gender,
				}),
				credentials: "include",
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({
	fullName,
	username,
	password,
	confirmPassword,
	gender,
}) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}

// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const userSignup = () => {
// 	const [loading, setloading] = useState(false);

// 	const signup = async ({
// 		fullname,
// 		username,
// 		password,
// 		confirmPassword,
// 		gender,
// 	}) => {
// 		const success = handleInputErrors({
// 			fullname,
// 			username,
// 			password,
// 			confirmPassword,
// 			gender,
// 		});

// 		if (!success) return;
// 		setloading(true);
// 		try {
// 			const res = await fetch("http://localhost:5000/api/auth/signup", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({
// 					fullname,
// 					username,
// 					password,
// 					confirmPassword,
// 					gender,
// 				}),
// 			});

// 			const data = await res.json();
// 			console.log(data);
// 		} catch (error) {
// 			console.log(error);
// 		} finally {
// 			setloading(false);
// 		}
// 	};

// 	return { loading, signup };
// };

// export default userSignup;

// function handleInputErrors({
// 	fullname,
// 	username,
// 	password,
// 	confirmPassword,
// 	gender,
// }) {
// 	if (!fullname || !username || !password || !confirmPassword || !gender) {
// 		toast.error("please fill all  fields");
// 		return false;
// 	}

// 	// if (password !== confirmPassword) {
// 	// 	toast.error("password not match");
// 	// 	return false;
// 	// }

// 	if (password.length < 6) {
// 		toast.error("password length must be 6 characters");
// 		return false;
// 	}

// 	return true;
// }
