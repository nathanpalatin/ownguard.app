import { useState } from 'react'

import {
	HStack,
	VStack,
	Text,
	Heading,
	Image,
	Icon,
	Pressable,
	Skeleton,
} from 'native-base'

import { Entypo } from '@expo/vector-icons'

import { UserPhoto } from '@components/UserPhoto'

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
		return (
			<VStack my={5} flex={1}>
				<HStack px={6} alignItems={'center'}>
					<Skeleton
						startColor={'gray.100'}
						endColor={'gray.200'}
						rounded={'full'}
						mt={1}
						w={10}
						h={10}
					/>
					<VStack ml={'2'}>
						<Skeleton
							startColor={'gray.100'}
							endColor={'gray.200'}
							rounded={'sm'}
							mt={1}
							w={24}
							h={3}
						/>
						<Skeleton
							startColor={'gray.100'}
							endColor={'gray.200'}
							rounded={'sm'}
							mt={1}
							w={12}
							h={3}
						/>
					</VStack>
				</HStack>
				<VStack py={2} px={6} ml={'2'}>
					<Skeleton
						startColor={'gray.100'}
						endColor={'gray.200'}
						rounded={'sm'}
						mt={1}
						w={'container'}
						h={3}
					/>
					<Skeleton
						startColor={'gray.100'}
						endColor={'gray.200'}
						fadeDuration={0.1}
						rounded={'sm'}
						mt={1}
						w={'64'}
						h={3}
					/>
					<Skeleton
						startColor={'gray.100'}
						endColor={'gray.200'}
						rounded={'sm'}
						mt={1}
						w={12}
						h={3}
					/>
				</VStack>
				<Skeleton
					fadeDuration={0.1}
					startColor={'gray.100'}
					endColor={'gray.200'}
					h={'80'}
				/>
			</VStack>
		)
	}

	return (
		<VStack my={6}>
			<HStack px={6} alignItems={'center'}>
				<UserPhoto
					source={
						avatar
							? { uri: avatar, cache: 'force-cache' }
							: defaultYUserPhotoImg
					}
					size={8}
				/>
				<VStack ml={'2'}>
					<Text fontSize="sm" fontWeight={'medium'} color={'gray.500'}>
						{name}{' '}
						<Icon as={Entypo} name="check" color={'blue.700'} size={'xs'} />
					</Text>
					<Text fontSize="xs" color={'gray.300'} fontFamily={'body'}>
						há {time}
					</Text>
				</VStack>
			</HStack>
			<Heading
				fontFamily={'body'}
				px={8}
				py={3}
				fontSize={'xs'}
				color={'gray.400'}
			>
				{legend}
			</Heading>

			<Image
				source={{ uri: image, cache: 'force-cache' }}
				w={'full'}
				resizeMode={'cover'}
				h={'96'}
				alt=""
			/>

			<HStack px={6} mt={3}>
				<Pressable mr={2} onPress={() => setLike(!like)}>
					{liked ? (
						<Icon as={Entypo} name="heart" color={'red.700'} size={'xl'} />
					) : (
						<Icon as={Entypo} name="heart-outlined" size={'xl'} />
					)}
				</Pressable>
				<Pressable onPress={() => {}}>
					<Icon as={Entypo} name="message" size={'xl'} />
				</Pressable>
			</HStack>
			<HStack px={6} mt={3}>
				<Text fontSize="xs" color={'gray.300'} fontFamily={'body'}>
					{comments} comentários
				</Text>
			</HStack>
		</VStack>
	)
}
