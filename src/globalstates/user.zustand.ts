import { create } from 'zustand'

import { UserDTO } from '@dtos/UserDTO'

type UserProps = {
	user: UserDTO | null
	setUser: (item: UserDTO | null) => void
}

const useProfile = create<UserProps>((set) => ({
	user: null,
	setUser: (item) => set({ user: item }),
}))

export default useProfile
