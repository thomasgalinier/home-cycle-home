import { getMe } from "@/services/api/auth.ts";

export async function checkAuthentication(): Promise<boolean> {
	try {
		await getMe();
		return true;
	} catch (error) {
		return false;
	}
}
