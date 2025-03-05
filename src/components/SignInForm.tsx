"use client";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "@/lib/user.actions";
import { useRouter } from "next/navigation";
import SocialLoginButtons from "./SocialLoginButtons";
import { Separator } from "./ui/separator";
import SeparatorWithText from "./SeparatorWithText";

const SignInSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

type SignInSchema = z.infer<typeof SignInSchema>;

const SignIn = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: SignInSchema) => {
		startTransition(() => {
			signIn(data).then(() => {
				router.push("/account");
			});
		});
	};
	return (
		<div className="grid gap-y-3">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-[300px]"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your email"
										{...field}
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your password"
										{...field}
										type="password"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full " disabled={isPending}>
						Log in
					</Button>
				</form>
			</Form>
			<SeparatorWithText text="or" />
			<SocialLoginButtons />
		</div>
	);
};

export default SignIn;
