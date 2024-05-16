import { api } from './api'

export const login = async (email: string, password: string) => {
	const res = await api.post('/users/login', { email, password })
	return res
}

export const registerUser = async (
	name: string,
	email: string,
	password: string,
) => {
	const res = await api.post('/users', { name, email, password })
	return res
}
