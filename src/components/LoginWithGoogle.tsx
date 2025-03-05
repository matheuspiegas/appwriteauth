import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signUpWithGoogle } from "@/lib/server/oauth";

const LoginWithGoogle = () => {
	return (
		<form action={signUpWithGoogle}>
			<Button type="submit" className="w-full" size={"icon"}>
				<FcGoogle />
			</Button>
		</form>
	);
};

export default LoginWithGoogle;
