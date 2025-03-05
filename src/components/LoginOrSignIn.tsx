"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LoginOrSignIn = () => {
	const className = "hover:underline";
	const path = usePathname();
	if (path === "/signin") {
		return (
			<Link href={"/signup"} className={className}>
				Don't have an account? Sign up
			</Link>
		);
	}
	return (
		<Link href={"/signin"} className={className}>
			Already have an account? Sign in
		</Link>
	);
};

export default LoginOrSignIn;
