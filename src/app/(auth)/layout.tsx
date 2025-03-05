import { getLoggedInUser } from "@/lib/user.actions";
import { redirect } from "next/navigation";
import type React from "react";

const Layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const user = await getLoggedInUser();
	console.log({ user });
	if (user) redirect("/account");
	return (
		<div className="flex items-center justify-center h-screen flex-col gap-y-2 bg-stone-700 text-zinc-900">
			{children}
		</div>
	);
};

export default Layout;
