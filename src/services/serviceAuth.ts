import { apiAuth } from './apiAuth'

export const login = async (email: string, password: string) => {
	const res = await apiAuth.post('/auth/login', { email, password })
	return res
}

export const registerUser = async (
	name: string,
	email: string,
	password: string,
) => {
	const res = await apiAuth.post('/auth/register', { name, email, password })
	return res
}
