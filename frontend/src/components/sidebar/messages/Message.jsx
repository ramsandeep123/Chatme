import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import useConversation from "../../../zustand/useConversation";
import { extractTime } from "../../../utils/extractTime";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderid === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe
		? authUser.profilepic
		: selectedConversation?.profilepic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img alt="Tailwind CSS chat bubble component" src={profilePic} />
				</div>
			</div>
			<div
				className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
			>
				{message.message}
			</div>
			<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
				{formattedTime}
			</div>
		</div>
	);
};
export default Message;

// import React from "react";
// import { useAuthContext } from "../../../context/AuthContext";
// import useConversation from "../../../zustand/useConversation";
// import { extractTime } from "../../../utils/extractTime";

// function Message({ message }) {
// 	const { authUser } = useAuthContext();
// 	const { selectedConversation } = useConversation();

// 	const fromMe = message.senderid === authUser._id;
// 	// console.log(message.senderid);
// 	// console.log(authUser._id);
// 	// console.log(fromMe);
// 	const chatClassName = fromMe ? "chat-start" : "chat-end";
// 	const profilepic = fromMe
// 		? authUser.profilepic
// 		: selectedConversation?.profilepic;
// 	const bubbleBgColor = !fromMe ? "bg-blue-500" : "";
// 	const formattedTime = extractTime(message.createdAt);
// 	const shakeClass = message.shouldShake ? "shake" : "";
// 	return (
// 		<div className={`chat ${chatClassName}`}>
// 			<div className="chat-image avatar">
// 				<div className="w-10 rounded-ful">
// 					<img src={profilepic} />
// 				</div>
// 			</div>

// 			<div
// 				className={`chat-bubble text-white ${bubbleBgColor}${shakeClass} pb-2`}
// 			>
// 				{message.message}
// 			</div>

// 			<div className={"chat-footer opacity-50 text-xs flex gap-1 items-center"}>
// 				{formattedTime}
// 			</div>
// 		</div>
// 	);
// }

// export default Message;
