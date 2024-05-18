import { View, Text, Pressable } from 'react-native'
import { Skeleton } from 'native-base'

import { ChevronLeft, Edit } from 'lucide-react-native'
import defaultYUserPhotoImg from '@assets/userPhotoDefault.png'

import { UserPhoto } from '@components/UserPhoto'

import { useAuth } from '@hooks/useAuth'

type Props = {
	title?: string
	avatar?: string
	handlePressOption?: () => void
	secondOption?: boolean
	logo?: boolean
}

const PHOTO_SIZE = 8

export function ScreenHeader({
	secondOption,
	handlePressOption,
	title,
	avatar,
}: Props) {
	const { isLoadingUserStorageData } = useAuth()

	return (
		<View className="pt-20 pb-5 bg-header px-8">
			<View className="flex my-2 flex-row justify-between items-center">
				<Pressable onPress={handlePressOption}>
					<ChevronLeft size={28} color={'#ffffff90'} />
				</Pressable>

				{title && (
					<Text className="flex-1 text-center text-zinc-100 text-lg font-bold">
						{title}
					</Text>
				)}
				{secondOption && (
					<View className="flex flex-row gap-3 items-center">
						<Pressable onPress={handlePressOption}>
							<Edit size={22} color={'#ffffff90'} />
						</Pressable>
						{isLoadingUserStorageData ? (
							<Skeleton
								w={PHOTO_SIZE}
								fadeDuration={0.1}
								mr={'2'}
								h={PHOTO_SIZE}
								rounded={'full'}
							/>
						) : (
							<UserPhoto
								source={avatar ? { uri: avatar } : defaultYUserPhotoImg}
								size={PHOTO_SIZE}
								alt="Foto de perfil"
							/>
						)}
					</View>
				)}
			</View>
			<View className="h-px w-full border border-zinc-100/10 my-1" />
		</View>
	)
}
