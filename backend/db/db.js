import mongoose from "mongoose";

const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.DB_KEY);
		console.log("Connect");
	} catch (e) {
		console.log(e);
	}
};

export default dbConnect;
