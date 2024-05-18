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

export function ScreenHeader({
	secondOption,
	handlePressOption,
	title,
	avatar,
}: Props) {
	const { isLoadingUserStorageData } = useAuth()

	return (
		<View className=" bg-zinc-900">
			<View className="pt-16 pb-5 px-8 flex flex-row justify-between items-center">
				<Pressable onPress={handlePressOption}>
					<ChevronLeft size={28} color={'#ffffff90'} />
				</Pressable>

				<Text className="flex-1 text-center text-zinc-100 text-2xl font-bold">
					{title}
				</Text>

				{secondOption && (
					<View className="flex flex-row gap-3 items-center">
						<Pressable onPress={handlePressOption}>
							<Edit size={22} color={'#ffffff90'} />
						</Pressable>
						{isLoadingUserStorageData ? (
							<Skeleton
								w={8}
								fadeDuration={0.1}
								startColor={'gray.500'}
								endColor={'gray.700'}
								mr={'2'}
								h={8}
								rounded={'full'}
							/>
						) : (
							<UserPhoto
								source={
									avatar
										? { uri: avatar, cache: 'force-cache' }
										: defaultYUserPhotoImg
								}
								size={8}
								alt="Foto de perfil"
							/>
						)}
					</View>
				)}
			</View>
		</View>
	)
}
