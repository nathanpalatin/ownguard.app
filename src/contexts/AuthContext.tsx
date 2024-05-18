/* eslint-disable no-useless-catch */
import { createContext, ReactNode, useEffect, useState } from 'react'

import { storageAuthTokenSave } from '@storage/storageAuthToken'
import {
	storageUserGet,
	storageUserRemove,
	storageUserSave,
} from '@storage/storageUser'

import { UserDTO } from '@dtos/UserDTO'

import { login } from '@services/serviceAuth'

export type AuthContextDataProps = {
	user: UserDTO
	singIn: (credential: string, password: string) => Promise<void>
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

	async function storageUserAndToken(userData: UserDTO, token: string) {
		try {
			setIsLoadingUserStorageData(true)
			await storageAuthTokenSave(token)
			await storageUserSave(userData)
			setUser(userData)
		} catch (error) {
			throw error
		} finally {
			setIsLoadingUserStorageData(false)
		}
	}

	async function singIn(credential: string, password: string) {
		try {
			const { data } = await login(credential, password)
			if (data.token) {
				storageUserAndToken(data.user, data.token)
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
