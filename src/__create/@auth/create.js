import { getToken } from '@auth/core/jwt';
import { getContext } from 'hono/context-storage';

export default function CreateAuth() {
	const auth = async () => {
		const c = getContext();
		try {
			const AUTH_URL = process.env.AUTH_URL ?? '';
			const token = await getToken({
				req: c.req.raw,
				secret: process.env.AUTH_SECRET,
				secureCookie: AUTH_URL ? AUTH_URL.startsWith('https') : false,
			});
			if (token) {
				return {
					user: {
						id: token.sub,
						email: token.email,
						name: token.name,
						image: token.picture,
					},
					expires: token.exp.toString(),
				};
			}
			return null;
		} catch {
			return null;
		}
	};
	return {
		auth,
	};
}
