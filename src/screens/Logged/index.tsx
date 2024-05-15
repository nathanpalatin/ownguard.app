import { Image, View, ImageBackground, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useAuth } from '@hooks/useAuth'

import Logo from '@assets/logo.png'

import { Button } from '@components/Button'

export function Logged() {
	const { user } = useAuth()

	const navigation = useNavigation<AppNavigatorRoutesProps>()

	return (
		<ImageBackground
			defaultSource={require('@assets/background-secondary.png')}
			source={require('@assets/background-secondary.png')}
			className="flex-1"
		>
			<View className="flex-1 justify-center items-center gap-10">
				<Image source={Logo} alt="logo" />
				<Text className="text-zinc-100 text-2xl text-center">
					Bem-vindo {'\n'}
					<Text className="font-bold">{user.name}</Text>
				</Text>

				<Button
					variant="outline"
					title="Entrar"
					onPress={() => navigation.push('home')}
				/>
			</View>
		</ImageBackground>
	)
}
