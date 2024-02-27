import jwt from "jsonwebtoken";

const generateToken = (userid) => {
	const token = jwt.sign({ userid }, process.env.JWT_KEY, {
		expiresIn: "15d",
	});

	return token;
};

export default generateToken;
