import { StatusBar, View } from 'react-native'

import { DefaultTheme, NavigationContainer } from '@react-navigation/native'

import { useAuth } from '@hooks/useAuth'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
	const { user } = useAuth()

	const theme = DefaultTheme
	theme.colors.background = 'primary'

	return (
		<View className="flex-1 bg-zinc-950">
			<StatusBar barStyle={'light-content'} />
			<NavigationContainer theme={theme}>
				{user.email ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
		</View>
	)
}
