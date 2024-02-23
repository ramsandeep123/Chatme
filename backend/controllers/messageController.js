import Conversation from "../models/coneversation.js";
import Message from "../models/message.js";
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverid } = req.params;

		const senderid = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderid, receiverid] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderid, receiverid],
			});
		}

		const newMessage = new Message({
			senderid,
			receiverid,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await conversation.save();
		await newMessage.save();

		// await Promise.all(await conversation.save(), await newMessage.save());

		res.status(201).json(newMessage);
	} catch (error) {
		console.log(error);
	}
};

export const getMessage = async (req, res) => {
	try {
		const { id: usertoChatid } = req.params;

		const senderid = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderid, usertoChatid] },
		}).populate("messages");

		if (!conversation) {
			return res.status(200).json([]);
		}

		res.status(200).json(conversation.messages);
	} catch (error) {
		console.log(error);
	}
};
