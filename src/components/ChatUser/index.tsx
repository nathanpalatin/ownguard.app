import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { HStack, Heading, Icon, Image, VStack } from 'native-base'

import { Entypo } from '@expo/vector-icons'

import { Loading } from '@components/Loading'

import defaultYUserPhotoImg from '@assets/userPhotoDefault.png'

type Props = TouchableOpacityProps & {
	name: string
	image: string
	isLoading: boolean
	username: string
}

export function ChatUser({ name, username, isLoading, image, ...rest }: Props) {
	if (isLoading) {
		return <Loading />
	}
	return (
		<TouchableOpacity {...rest}>
			<HStack
				bg={'gray.500'}
				p={'2'}
				alignItems={'center'}
				pr={'4'}
				rounded={'md'}
				mb={'2'}
			>
				<Image
					source={
						image ? { uri: image, cache: 'force-cache' } : defaultYUserPhotoImg
					}
					w={10}
					h={10}
					rounded={'full'}
					alt={'User profile'}
					mr={'3'}
					ml={'2'}
					resizeMode={'cover'}
				/>

				<VStack flex={1}>
					<Heading fontSize={'sm'} color={'white'}>
						{name}
					</Heading>
					<Heading fontSize={'xs'} color={'gray.300'}>
						@{username}
					</Heading>
				</VStack>
				<Icon as={Entypo} name="chevron-thin-right" color={'gray.300'} />
			</HStack>
		</TouchableOpacity>
	)
}
