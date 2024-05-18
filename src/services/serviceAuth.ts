import { api } from './api'

export const login = async (credential: string, password: string) => {
	const res = await api.post('/users/login', { credential, password })
	return res
}

export const registerUser = async (
	name: string,
	email: string,
	phone: string,
	username: string,
	password: string,
) => {
	const res = await api.post('/users', {
		name,
		email,
		phone,
		username,
		password,
	})
	return res
}
