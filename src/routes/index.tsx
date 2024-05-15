import { ImageBackground, StatusBar } from 'react-native'

import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { useAuth } from '@hooks/useAuth'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
	const { user } = useAuth()

	return (
		<ImageBackground
			className="flex-1"
			source={require('@assets/background.png')}
			defaultSource={require('@assets/background.png')}
		>
			<StatusBar barStyle={'light-content'} />
			<NavigationContainer theme={DefaultTheme}>
				{user.email ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
		</ImageBackground>
	)
}
