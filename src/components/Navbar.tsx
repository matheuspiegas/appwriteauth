"use client";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<div className="w-full bg-verdeClaro relative h-12">
			<nav className="">
				{isMenuOpen ? (
					<X
						className="block md:hidden ml-auto"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					/>
				) : (
					<Menu
						className="block md:hidden ml-auto"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					/>
				)}
				<ul className="hidden md:flex space-x-4">
					<li>Home</li>
					<li>About</li>
					<li>Contact</li>
					<ThemeToggle />
				</ul>
			</nav>

			<div
				className={` bg-verdeClaro fixed top-0 left-0  h-screen z-20 transition-transform duration-300 transform ${
					isMenuOpen ? "translate-x-0" : "-translate-x-full"
				} w-64`}
			>
				<ul className="flex flex-col space-y-4 md:hidden justify-between">
					<li>Home</li>
					<li>About</li>
					<li>Contact</li>
				</ul>
			</div>

			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className={`fixed inset-0  z-10 transition-opacity duration-300 transform ${
					isMenuOpen
						? "opacity-100 bg-black bg-opacity-50 backdrop-blur-sm"
						: "opacity-0 pointer-events-none"
				}`}
				onClick={() => setIsMenuOpen(false)}
			/>
		</div>
	);
};

export default Navbar;
