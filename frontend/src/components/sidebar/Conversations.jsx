import React from "react";
import Conversation from "./Conversation";
import userGetCOnversation from "../../hooks/userGetCOnversation";
import { getRandomEmoji } from "../../utils/emoji";

function Conversations() {
	const { loading, conversation } = userGetCOnversation();

	return (
		//console.log(conversation);
		<div className="py-2 flex flex-col overflow-auto">
			{conversation.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversation.length - 1}
				/>
			))}

			{loading ? (
				<span className="loading loading-spinner mx-auto"></span>
			) : null}
		</div>
	);
}

export default Conversations;
