"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { uploadFile } from "@/lib/user.actions";
import { Input } from "./ui/input";

interface UploadFileProps {
	userId: string;
}

const UploadFile = ({ userId }: UploadFileProps) => {
	const { handleSubmit, register } = useForm();
	const handleUploadFile = async (data: any) => {
		await uploadFile(data.file[0], userId);
	};
	return (
		<form onSubmit={handleSubmit(handleUploadFile)} className="flex">
			<Input type="file" {...register("file")} className="w-[400px]" />
			<Button type="submit">Upload</Button>
		</form>
	);
};

export default UploadFile;
