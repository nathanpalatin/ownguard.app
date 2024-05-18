import { api } from './api'

import { storageAuthTokenGet } from '@storage/storageAuthToken'

export const sendPhotoProfile = async (file: FormData) => {
	const token = await storageAuthTokenGet()
	const res = await api.post('/upload', file, {
		headers: {
			Authorization: token,
		},
	})
	return res
}

export const getPhotoProfile = async () => {
	const token = await storageAuthTokenGet()
	const res = await api.get('/upload', {
		headers: {
			Authorization: token,
		},
	})
	return res
}

export const updatePhotoProfile = async (file: FormData) => {
	const token = await storageAuthTokenGet()
	const res = await api.patch('/upload', file, {
		headers: {
			Authorization: token,
		},
	})
	return res
}

export const removePhotoProfile = async () => {
	const token = await storageAuthTokenGet()
	const res = await api.delete('/upload', {
		headers: {
			Authorization: token,
		},
	})
	return res
}
