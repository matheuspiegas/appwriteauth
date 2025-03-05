import React from "react";
import LoginWithGithub from "./LoginWithGithub";
import LoginWithGoogle from "./LoginWithGoogle";

const SocialLoginButtons = () => {
	return (
		<div className="grid grid-cols-2 gap-x-1.5">
			<LoginWithGithub />
			<LoginWithGoogle />
		</div>
	);
};

export default SocialLoginButtons;
