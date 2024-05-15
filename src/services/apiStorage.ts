import axios from 'axios'

import { AppError } from '@utils/AppError'

const apiStorage = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_STORAGE_URL,
})

apiStorage.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.data) {
			return Promise.reject(new AppError(error.response.data.message))
		} else {
			return Promise.reject(error)
		}
	},
)

export { apiStorage }
