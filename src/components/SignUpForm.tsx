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
import { signUpWithEmail } from "@/lib/user.actions";
import { useRouter } from "next/navigation";

const SignUpSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	name: z.string().min(3, "Name must be at least 3 characters long"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

type SignUpSchema = z.infer<typeof SignUpSchema>;

const SignUp = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			email: "",
			name: "",
			password: "",
		},
	});

	const onSubmit = async (data: SignUpSchema) => {
		startTransition(() => {
			signUpWithEmail(data).then((data) => {
				if (data?.code === 409) {
					form.setError("root", { message: data.message });
				} else {
					router.push("/account");
				}
			});
		});
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-[300px]"
			>
				<FormField
					control={form.control}
					name="name"
					// disabled={isPending}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your name"
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
					name="email"
					// disabled={isPending}
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
				<Button type="submit" className="w-full" disabled={isPending}>
					Sign Up
				</Button>
				{form.formState.errors.root && (
					<FormMessage>This email already in use.</FormMessage>
				)}
			</form>
		</Form>
	);
};

export default SignUp;
