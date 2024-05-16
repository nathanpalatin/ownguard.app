import { api } from './api'
import { FormDataProps } from '@dtos/FormDataDTO'

import { storageAuthTokenGet } from '@storage/storageAuthToken'

export const getProfile = async () => {
	const token = await storageAuthTokenGet()
	const { data } = await api.get('/profile', {
		headers: {
			Authorization: token,
		},
	})
	return data
}

export const createProfile = async (data: FormDataProps) => {
	const token = await storageAuthTokenGet()
	const res = await api.post('/profile', data, {
		headers: {
			Authorization: token,
		},
	})
	return res
}

export const updateUser = async (data: FormDataProps) => {
	const token = await storageAuthTokenGet()
	const res = await api.patch('/profile', data, {
		headers: {
			Authorization: token,
		},
	})
	return res
}
