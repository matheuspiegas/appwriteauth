import { getLoggedInUser } from "@/lib/user.actions";
import SignOutButton from "@/components/SignOutButton";
import UploadFile from "@/components/UploadFile";

export default async function HomePage() {
	const user = await getLoggedInUser();
	return (
		<>
			<ul>
				<li>
					<strong>Email:</strong> {user?.email}
				</li>
				<li>
					<strong>Name:</strong> {user?.name}
				</li>
				<li>
					<strong>ID: </strong> {user?.$id}
				</li>
			</ul>
			<UploadFile userId={user?.$id} />
			<h2 className="text-2xl">Files</h2>
			<SignOutButton />
		</>
	);
}
