import React from "react";
import { BiLogOut } from "react-icons/bi";
import userLogout from "../../hooks/userLogout";

function LogoutBUtton() {
	const { loading, logout } = userLogout();
	return (
		<div className="mt-auto">
			<BiLogOut
				className="w-6 h-6 text-white cursor-pointer"
				onClick={logout}
			/>
		</div>
	);
}

export default LogoutBUtton;
