import { useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native'

import { Entypo } from '@expo/vector-icons'

import { UserPhoto } from '@components/UserPhoto'
import { Skeleton } from '@components/Loading'

import { PostProps } from '@dtos/PostDTO'
import defaultYUserPhotoImg from '@assets/userPhotoDefault.png'
export function Post({
	avatar,
	image,
	liked,
	name,
	legend,
	comments,
	time,
	loading,
}: PostProps) {
	const [like, setLike] = useState(liked)

	if (loading) {
		return <Skeleton className="w-36 h-4 bg-black" />
	}

	return (
		<View className="my-6">
			<View className="flex flex-row px-6 items-start">
				<UserPhoto
					source={
						avatar
							? { uri: avatar, cache: 'force-cache' }
							: defaultYUserPhotoImg
					}
					size={8}
				/>
				<View className="ml-2">
					<Text className="text-sm font-medium text-zinc-500">
						{name}{' '}
						<Entypo name="check" color={'blue.700'} className="size-10" />
					</Text>
					<Text className="text-sm text-zinc-400 font-light">há {time}</Text>
				</View>
			</View>
			<Text className="font-medium px-8 py-3 text-xs text-zinc-400">
				{legend}
			</Text>

			<Image
				source={{ uri: image, cache: 'force-cache' }}
				className="w-full h-96 object-cover"
				alt=""
			/>

			<View className="flex flex-row px-6 mt-3">
				<Pressable className="mr-2" onPress={() => setLike(!like)}>
					{liked ? (
						<Entypo name="heart" color={'red.700'} size={26} />
					) : (
						<Entypo name="heart-outlined" size={26} />
					)}
				</Pressable>
				<Pressable onPress={() => { }}>
					<Entypo name="message" size={26} />
				</Pressable>
			</View>
			<View className="px-6 mt-2">
				<Text className="text-xs text-zinc-500 font-medium">{name} bora?</Text>
				<Text className="text-xs text-zinc-500 font-medium">
					{comments} comentários
				</Text>
			</View>
		</View>
	)
}
