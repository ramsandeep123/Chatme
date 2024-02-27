import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function userGetCOnversation() {
	const [loadig, setLoading] = useState(false);

	const [conversation, setConversation] = useState([]);

	useEffect(() => {
		const getConversation = async () => {
			setLoading(true);
			try {
				const res = await fetch("http://localhost:5000/api/users", {
					credentials: "include",
				});
				const data = await res.json();
				console.log(data);

				if (data.error) {
					throw new Error(data.error);
				}

				setConversation(data);
			} catch (e) {
				console.log(e);
				toast.error(e.message);
			} finally {
				setLoading(false);
			}
		};

		getConversation();
	}, []);

	return { loadig, conversation };
}

export default userGetCOnversation;
