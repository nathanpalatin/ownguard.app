import { apiStorage } from './apiStorage'

import { storageAuthTokenGet } from '@storage/storageAuthToken'

export const sendPhotoProfile = async (file: FormData) => {
	const token = await storageAuthTokenGet()
	const res = await apiStorage.post('/upload', file, {
		headers: {
			Authorization: token,
		},
	})
	return res
}

export const getPhotoProfile = async () => {
	const token = await storageAuthTokenGet()
	const res = await apiStorage.get('/upload', {
		headers: {
			Authorization: token,
		},
	})
	return res
}

export const updatePhotoProfile = async (file: FormData) => {
	const token = await storageAuthTokenGet()
	const res = await apiStorage.patch('/upload', file, {
		headers: {
			Authorization: token,
		},
	})
	return res
}

export const removePhotoProfile = async () => {
	const token = await storageAuthTokenGet()
	const res = await apiStorage.delete('/upload', {
		headers: {
			Authorization: token,
		},
	})
	return res
}
