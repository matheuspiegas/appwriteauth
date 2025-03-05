import Navbar from "@/components/Navbar";
import { createUserInDatabase, getLoggedInUser } from "@/lib/user.actions";
import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
	const user = await getLoggedInUser();
	console.log({ user });
	if (!user) redirect("/signin");
	if (user) {
		const { $id, email, name } = user;
		await createUserInDatabase({ userId: $id, email, name });
	}
	return (
		<div className="flex flex-col bg-stone-700 min-h-screen text-zinc-900">
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
