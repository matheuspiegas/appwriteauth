export const constructFileURL = (fileId: string) => {
	return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${fileId}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};
