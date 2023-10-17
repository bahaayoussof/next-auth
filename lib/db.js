import { MongoClient } from "mongodb";

export async function connectToDatabase() {
	const client = await MongoClient.connect(
		"mongodb+srv://zoka:H2OHXDKOFP18jfDg@cluster0.yofqh5m.mongodb.net/auth-demo?retryWrites=true&w=majority"
	);

	return client;
}
