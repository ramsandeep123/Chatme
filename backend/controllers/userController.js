import User from "../models/User.js";

export const getUserForSidebar = async (req, res) => {
	try {
		const loginuserid = req.user._id;

		const allUser = await User.find({ _id: { $ne: loginuserid } }).select(
			"-password"
		);

		res.status(200).json(allUser);
	} catch (error) {
		console.log(error);
	}
};
