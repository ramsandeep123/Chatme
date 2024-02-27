import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dbConnect from "./db/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = 5000 || process.env.PORT;

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);

app.use("/api/messages", MessageRoutes);

app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.get("/", (req, res) => {
	res.send("Welcome");
});

server.listen(port, () => {
	dbConnect();
	console.log(`listening on port ${port}`);
});
