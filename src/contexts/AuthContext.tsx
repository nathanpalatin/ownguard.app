/* eslint-disable no-useless-catch */
import { createContext, ReactNode, useEffect, useState } from 'react'

import { storageAuthTokenSave } from '@storage/storageAuthToken'
import {
	storageUserGet,
	storageUserRemove,
	storageUserSave,
	updateAvatarInStorage,
} from '@storage/storageUser'

import { UserDTO } from '@dtos/UserDTO'

import { login } from '@services/serviceAuth'
import { getProfile } from '@services/serviceProfile'
import { getPhotoProfile } from '@services/serviceStorage'

export type AuthContextDataProps = {
	user: UserDTO
	singIn: (email: string, password: string) => Promise<void>
	signOut: () => Promise<void>
	updateUserProfile: (userUpdated: UserDTO) => Promise<void>
	isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
	children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<UserDTO>({} as UserDTO)
	const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

	async function storageUserAndToken(token: string) {
		try {
			setIsLoadingUserStorageData(true)
			await storageAuthTokenSave(token)
			const res = await getProfile()

			const res2 = await getPhotoProfile()
			if (res2) {
				await updateAvatarInStorage(res.data)
			}

			await storageUserSave(res.data[0])

			setUser(res.data[0])
		} catch (error) {
			throw error
		} finally {
			setIsLoadingUserStorageData(false)
		}
	}

	async function singIn(email: string, password: string) {
		try {
			const { data } = await login(email, password)
			if (data.data.token) {
				storageUserAndToken(data.data.token)
			}
		} catch (error) {
			throw error
		}
	}

	async function signOut() {
		try {
			setIsLoadingUserStorageData(true)
			setUser({} as UserDTO)
			await storageUserRemove()
		} catch (error) {
			throw error
		} finally {
			setIsLoadingUserStorageData(false)
		}
	}

	async function updateUserProfile(userUpdated: UserDTO) {
		try {
			setUser(userUpdated)
			await storageUserSave(userUpdated)
		} catch (error) {
			throw error
		}
	}

	async function loadUserData() {
		try {
			const userLogged = await storageUserGet()

			if (userLogged) {
				setUser(userLogged)
			}
		} catch (error) {
			throw error
		} finally {
			setIsLoadingUserStorageData(false)
		}
	}

	useEffect(() => {
		loadUserData()
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				singIn,
				updateUserProfile,
				signOut,
				isLoadingUserStorageData,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
