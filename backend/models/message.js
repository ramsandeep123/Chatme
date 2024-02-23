import mongoose from "mongoose";
import { type } from "os";

const MessageSchema = new mongoose.Schema(
	{
		senderid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		receiverid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
