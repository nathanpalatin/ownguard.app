import { apiProfile } from './apiProfile'
import { FormDataProps } from '@dtos/FormDataDTO'

import { storageAuthTokenGet } from '@storage/storageAuthToken'

export const getProfile = async () => {
	const token = await storageAuthTokenGet()
	const { data } = await apiProfile.get('/profile', {
		headers: {
			Authorization: token,
		},
	})
	return data
}

export const createProfile = async (data: FormDataProps) => {
	const token = await storageAuthTokenGet()
	const res = await apiProfile.post('/profile', data, {
		headers: {
			Authorization: token,
		},
	})
	return res
}

export const updateUser = async (data: FormDataProps) => {
	const token = await storageAuthTokenGet()
	const res = await apiProfile.patch('/profile', data, {
		headers: {
			Authorization: token,
		},
	})
	return res
}
