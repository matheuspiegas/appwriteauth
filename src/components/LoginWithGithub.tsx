import React from "react";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import { signUpWithGithub } from "@/lib/server/oauth";

const LoginWithGithub = () => {
	return (
		<form action={signUpWithGithub}>
			<Button type="submit" className="w-full" size={"icon"}>
				<FaGithub />
			</Button>
		</form>
	);
};

export default LoginWithGithub;
