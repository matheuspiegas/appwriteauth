import { signOut } from "@/lib/user.actions";
import React from "react";
import { Button } from "./ui/button";

const SignOutButton = () => {
	return (
		<form action={signOut}>
			<Button type="submit">Sign out</Button>
		</form>
	);
};

export default SignOutButton;
