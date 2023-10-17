import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
	if (req.method !== "POST") {
		return;
	}

	const { email, password } = req?.body;

	if (!email || !email.includes("@") || !password || password.trim().length < 7) {
		res.status(403).json({
			message: "Invalid inputs - password also should be at least 7 characters long.",
		});
		return;
	}

	const client = await connectToDatabase();
	const db = client.db();

	const existingUser = await db.collection("users").findOne({ email: email });

	if (existingUser) {
		res.status(422).json({ message: "User exists already!" });
		client.close();
		return;
	}

	const hashedPassword = await hashPassword(password);

	const result = await db.collection("users").insertOne({ email, password: hashedPassword });

	res.status(200).json({ message: "User has been created!", result });
	client.close();
}

export default handler;
