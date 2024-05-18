import { api } from './api'

export const sendPhotoProfile = async (file: FormData) => {
	const res = await api.post('/users/avatar', file)
	return res
}

export const getPhotoProfile = async () => {
	const res = await api.get('/upload')
	return res
}

export const updatePhotoProfile = async (file: FormData) => {
	const res = await api.patch('/upload', file)
	return res
}

export const removePhotoProfile = async () => {
	const res = await api.delete('/upload')
	return res
}
