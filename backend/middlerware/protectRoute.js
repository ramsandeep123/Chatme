import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized -NO TOKEN Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_KEY);

		if (!decoded) {
			return res.status(401).json({ error: "INVALID TOKEN" });
		}

		const user = await User.findById(decoded.userid).select("-password");

		req.user = user;

		next();
	} catch (error) {
		console.log(error);
	}
};

export default protectRoute;
