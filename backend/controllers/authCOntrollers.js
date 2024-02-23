import User from "../models/User.js";

import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/GenreteToken.js";

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });

		//console.log(user);

		const isPasswordCorrect = await bcrypt.compare(
			password,
			user?.password || ""
		);

		//console.log(isPasswordCorrect);

		if (!isPasswordCorrect || !user) {
			return res.status(403).json({ error: "Invalid password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(500).json({ message: "logout successfully" });
	} catch (error) {
		console.log(error);
	}
};

export const signup = async (req, res) => {
	try {
		const { fullname, username, password, confirmpassword, gender } = req.body;

		if (password !== confirmpassword) {
			return res.status(400).json({ error: "password not matched" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exits" });
		}

		const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;

		const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const salt = bcrypt.genSaltSync(12);

		const hashPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullname,
			username,
			password: hashPassword,
			gender,
			profilepic: gender === "male" ? boyProfile : girlProfile,
		});

		generateTokenAndSetCookie(newUser._id, res);

		await newUser.save();

		res.status(200).json(newUser);
	} catch (error) {
		console.log(error);
	}
};
