import axios from 'axios'

import { AppError } from '@utils/AppError'

const apiProfile = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_PROFILE_URL,
})

apiProfile.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.data) {
			return Promise.reject(new AppError(error.response.data.message))
		} else {
			return Promise.reject(error)
		}
	},
)

export { apiProfile }
