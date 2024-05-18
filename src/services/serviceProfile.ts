import { api } from './api'
import { FormDataProps } from '@dtos/FormDataDTO'

export const getProfile = async () => {
	const res = await api.get('/profile')
	return res
}

export const createProfile = async (data: FormDataProps) => {
	const res = await api.post('/profile', data)
	return res
}

export const updateUser = async (data: FormDataProps) => {
	const res = await api.patch('/profile', data)
	return res
}
