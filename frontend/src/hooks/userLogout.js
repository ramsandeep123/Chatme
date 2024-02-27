import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

function userLogout() {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("http://localhost:5000/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();

			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			document.cookie = `jwt=""; max-age=${0}; path=/; samesite=strict`;

			setAuthUser(null);
		} catch (e) {
			console.log(e);
			toast.error(e.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
}

export default userLogout;
