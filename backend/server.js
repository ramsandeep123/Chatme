import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dbConnect from "./db/db.js";
import cookieParser from "cookie-parser";

dotenv.config("./env");

const app = express();

const port = 5000 || process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/messages", MessageRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
	res.send("Welcome");
});

app.listen(port, () => {
	dbConnect();
	console.log(`listening on port ${port}`);
});
