import { useEffect } from 'react'
import { ImageBackground, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Button } from '@components/Button'

import { getPermissions } from '@utils/permissions'

export function Welcome() {
	useEffect(() => {
		getPermissions()
	}, [])
	const navigation = useNavigation<AuthNavigatorRoutesProps>()
	return (
		<ImageBackground
			className="flex-1"
			source={require('@assets/background.png')}
			defaultSource={require('@assets/background.png')}
		>
			<View className="flex-1 justify-end mb-56 items-center">
				<Button
					title="Acessar conta"
					variant="outline"
					onPress={() => navigation.push('signIn')}
				/>
			</View>
		</ImageBackground>
	)
}
