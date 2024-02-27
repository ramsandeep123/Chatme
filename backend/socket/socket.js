import { Server } from "socket.io";
import http from "http";

import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: ["https://chatme-qafa.onrender.com"],
		methods: ["GET", "POST"],
	},
});

export const getReciverSocketid = (reciverid) => {
	return userSocketMap[reciverid];
};
const userSocketMap = {};

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);
	const userid = socket.handshake.query.userid;
	console.log(userid);
	if (userid != "undefined") userSocketMap[userid] = socket.id;
	io.emit("getOnlineUser", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("a user disconnected", socket.id);
		delete userSocketMap[userid];
		io.emit("getOnlineUser", Object.keys(userSocketMap));
	});
});
export { app, io, server };
