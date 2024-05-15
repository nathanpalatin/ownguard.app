import { Center, HStack, Skeleton, VStack } from 'native-base'
import { SafeAreaView } from 'react-native'

export function Loading() {
	return (
		<SafeAreaView>
			<Center w="100%">
				<VStack
					w="100%"
					space={6}
					_dark={{
						borderColor: 'coolGray.500',
					}}
					_light={{
						borderColor: 'coolGray.200',
					}}
				>
					<HStack
						bg={'gray.500'}
						p={'2'}
						alignItems={'center'}
						pr={'4'}
						rounded={'md'}
						mb={'2'}
					>
						<Skeleton
							startColor={'gray.400'}
							endColor={'gray.600'}
							w={10}
							h={10}
							rounded={'full'}
							mr={'4'}
							ml={'2'}
						/>

						<VStack flex={1}>
							<Skeleton
								startColor={'gray.400'}
								endColor={'gray.600'}
								rounded={'sm'}
								mt={1}
								w={'40%'}
								h={3}
							/>
							<Skeleton
								startColor={'gray.400'}
								endColor={'gray.600'}
								rounded={'sm'}
								mt={1}
								w={'80%'}
								h={3}
							/>
						</VStack>
					</HStack>
				</VStack>
			</Center>
		</SafeAreaView>
	)
}
