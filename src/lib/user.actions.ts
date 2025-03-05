"use server";
import { ID, OAuthProvider, Query, Storage } from "node-appwrite";
import { createAdminClient, createSessionClient } from "./appwrite";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
		return await account.get();
	} catch (error) {
		return null;
	}
}

export const signUpWithEmail = async ({
	email,
	password,
	name,
}: { email: string; password: string; name: string }) => {
	try {
		const { account, databases } = await createAdminClient();
		const newUser = await account.create(ID.unique(), email, password, name);
		console.log({ newUser });
		const dbUser = await databases.createDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
			process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
			ID.unique(),
			{
				userId: newUser.$id,
				email,
				name,
			},
		);
		console.log({ dbUser });
		const session = await account.createEmailPasswordSession(email, password);

		(await cookies()).set("session", session.secret, {
			path: "/",
			sameSite: "strict",
			httpOnly: true,
			secure: true,
		});

		return redirect("/account");
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return error.response;
	}
};

export const signIn = async ({
	email,
	password,
}: { email: string; password: string }) => {
	try {
		const { account } = await createAdminClient();
		const session = await account.createEmailPasswordSession(email, password);
		(await cookies()).set("session", session.secret, {
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});
		return redirect("/account");
	} catch (error: any) {
		return error.response;
	}
};

export const signOut = async () => {
	const { account } = await createSessionClient();

	(await cookies()).delete("session");
	await account.deleteSession("current");

	redirect("/signin");
};

export const createUserInDatabase = async (user: {
	userId: string;
	email: string;
	name: string;
}) => {
	const { databases } = await createAdminClient();

	const existingUser = await databases.listDocuments(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
		process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
		[Query.equal("userId", user.userId)],
	);

	if (existingUser.documents.length) return;

	const newUser = await databases.createDocument(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
		process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
		ID.unique(),
		user,
	);
	return newUser;
};

export const uploadFile = async (file: File, userId: string) => {
	const { client } = await createSessionClient();
	const { databases } = await createAdminClient();
	const storage = new Storage(client);

	const response = await storage.createFile(
		process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
		ID.unique(),
		file,
	);
	const newFile = await databases.createDocument(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
		process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION!,
		ID.unique(),
		{
			userId,
			fileId: response.$id,
			name: response.name,
		},
	);
};

export const getFiles = async (userId: string) => {
	const { databases } = await createAdminClient();
	const files = await databases.listDocuments(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
		process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION!,
		[Query.equal("userId", userId)],
	);
	return files.documents;
};
