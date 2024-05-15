import { useState } from 'react'
import { ScrollView, View } from 'react-native'

import { HStack, VStack } from 'native-base'

import { useAuth } from '@hooks/useAuth'

import { useSocket } from '@contexts/socket'

import { HomeHeader } from '@components/HomeHeader'
import { Post } from '@components/Post'
import { Sheet } from '@components/BottomModal'

export function Home() {
	const { user } = useAuth()

	const [isOpen, setIsOpen] = useState(false)

	function toggleSheet() {
		setIsOpen((prevState) => !prevState)
	}

	const { isLoading } = useSocket()

	return (
		<>
			<VStack flex={1} mb={'6'}>
				<HomeHeader />
				<ScrollView showsVerticalScrollIndicator={false}>
					<Post
						video
						loading={isLoading}
						avatar={user.avatar}
						comments={210}
						liked
						name={user.name}
						time={'12 minutos atrás'}
						legend={'Bora um padel, galera?! 😉'}
						image={
							'https://holmesplace20prod.s3.eu-central-1.amazonaws.com/58281a7c9995609b5f4e7df426d13767461457d0_PEREX_5_exercicios_para_melhorar_a_sua_performance_no_padel.jpg'
						}
					/>

					<HStack my={3} />
				</ScrollView>
			</VStack>

			{isOpen && (
				<Sheet onClose={toggleSheet}>
					<View />
				</Sheet>
			)}
		</>
	)
}
