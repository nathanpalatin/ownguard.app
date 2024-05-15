import { Text, View, Pressable } from 'react-native'
import { Skeleton } from 'native-base'

import { useAuth } from '@hooks/useAuth'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MessageCircle, Bell } from 'lucide-react-native'

import defaultYUserPhotoImg from '@assets/userPhotoDefault.png'

import { UserPhoto } from '@components/UserPhoto'

const PHOTO_SIZE = 8

export function HomeHeader() {
	const { user, isLoadingUserStorageData } = useAuth()

	const navigation = useNavigation<AppNavigatorRoutesProps>()

	return (
		<View className="flex flex-row items-center bg-header pt-20 pb-4 px-6 ">
			{isLoadingUserStorageData ? (
				<Skeleton
					w={PHOTO_SIZE}
					fadeDuration={0.1}
					mr={'2'}
					h={PHOTO_SIZE}
					rounded={'full'}
				/>
			) : (
				<Pressable onPress={() => navigation.push('profile')}>
					<UserPhoto
						source={
							user.avatar
								? {
										uri: user.avatar,
										cache: 'force-cache',
									}
								: defaultYUserPhotoImg
						}
						size={PHOTO_SIZE}
						alt="Foto de perfil"
						mr={'2'}
					/>
				</Pressable>
			)}
			<View className="flex-1">
				<Text className="text-zinc-100 text-xs">Olá,</Text>
				<Text className="text-zinc-50 text-sm">{user.name}</Text>
			</View>
			<Pressable className="mr-5" onPress={() => navigation.push('chats')}>
				<MessageCircle color={'#fff'} size="20" />
			</Pressable>
			<Pressable onPress={() => navigation.push('notifications')}>
				<Bell color={'#fff'} size="20" />
			</Pressable>
		</View>
	)
}
