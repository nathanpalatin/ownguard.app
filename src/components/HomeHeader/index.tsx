import { Text, View, Pressable } from 'react-native'
import { Skeleton } from 'native-base'

import { useAuth } from '@hooks/useAuth'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { MessageCircle, Bell } from 'lucide-react-native'

import defaultYUserPhotoImg from '@assets/userPhotoDefault.png'

import { UserPhoto } from '@components/UserPhoto'

export function HomeHeader() {
	const { user, isLoadingUserStorageData } = useAuth()

	const navigation = useNavigation<AppNavigatorRoutesProps>()

	return (
		<View className="flex flex-row items-center bg-zinc-900 pt-20 pb-4 px-6 ">
			{isLoadingUserStorageData ? (
				<Skeleton
					w={8}
					fadeDuration={0.1}
					startColor={'gray.500'}
					endColor={'gray.800'}
					mr={'2'}
					h={8}
					rounded={'full'}
				/>
			) : (
				<Pressable onPress={() => navigation.navigate('profile')}>
					<UserPhoto
						source={
							user.avatar
								? {
									uri: user.avatar,
									cache: 'default',
								}
								: defaultYUserPhotoImg
						}
						size={8}
						alt="Foto de perfil"
						mr={'2'}
					/>
				</Pressable>
			)}
			<View className="flex-1">
				<Text className="text-zinc-100 text-xs">Olá,</Text>
				<Text className="text-zinc-50 text-sm">{user.name}</Text>
			</View>
			<Pressable className="mr-5" onPress={() => navigation.navigate('chats')}>
				<MessageCircle color={'#fff'} size="20" />
			</Pressable>
			<Pressable onPress={() => navigation.navigate('notifications')}>
				<Bell color={'#fff'} size="20" />
			</Pressable>
		</View>
	)
}
