"use client";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const theme = localStorage.getItem("theme");
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
			setIsDark(true);
		}
	}, []);

	const toggleTheme = () => {
		if (isDark) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
			setIsDark(false);
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
			setIsDark(true);
		}
	};

	return (
		<div>
			<button onClick={toggleTheme} type="button">
				{isDark ? "Light" : "Dark"} Mode
			</button>
		</div>
	);
};

export default ThemeToggle;
