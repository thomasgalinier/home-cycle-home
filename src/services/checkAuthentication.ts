import { getMe } from "@/services/api/auth.ts";

export async function checkAuthentication(): Promise<boolean> {
	try {
		await getMe();
		return true;
	} catch (error) {
		return false;
	}
}

export async function checkAuthenticationRole(): Promise<'ADMIN' | 'CLIENT' | 'SUPER_ADMIN' | 'TECHNICIEN' | false> {
	try {
		const user = await getMe();
		return user.role
	} catch (error) {
		return false;
	}
}