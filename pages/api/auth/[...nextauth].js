import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export const authOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const client = await connectToDatabase();

				const usersCollection = client.db().collection("users");
				const user = await usersCollection.findOne({ email: credentials.email });

				if (!user) {
					client.close();
					throw new Error("No user found!");
				}

				const isValid = await verifyPassword(credentials.password, user.password);

				if (!isValid) {
					client.close();
					throw new Error("incorrect password!");
				}

				client.close();
				return { name: "", email: user.email, image: "" };
			},
		}),
	],
	secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
};

export default NextAuth(authOptions);
