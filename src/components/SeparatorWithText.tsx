import React from "react";
import { Separator } from "./ui/separator";

const SeparatorWithText = ({ text }: { text: string }) => {
	return (
		<div className="flex items-center gap-4">
			<Separator className="flex-1 bg-stone-950" />
			<span className="text-zinc-900">{text}</span>
			<Separator className="flex-1 bg-stone-950" />
		</div>
	);
};

export default SeparatorWithText;
