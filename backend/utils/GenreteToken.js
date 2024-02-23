import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userid, res) => {
	const token = jwt.sign({ userid }, process.env.JWT_KEY, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "strict",
	});
};

export default generateTokenAndSetCookie;
