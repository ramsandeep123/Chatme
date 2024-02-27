import React from "react";
import SearchINput from "./SearchINput";
import Conversations from "./Conversations";
import LogoutBUtton from "./LogoutBUtton";

function Sidebar() {
	return (
		<div className="border-slate-500 p-4 flex flex-col">
			<SearchINput />
			<div className="divider my-6 py-0 h-1" />
			<Conversations />
			<div className="divider my-6 py-0 h-1" />
			<LogoutBUtton />
		</div>
	);
}

export default Sidebar;
