import { NativeBaseProvider } from 'native-base'

import 'react-native-gesture-handler'

import './global.css'

import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
} from '@expo-google-fonts/inter'

import { useFonts } from 'expo-font'

import { THEME } from './src/theme'

import { Routes } from './src/routes'

import { SocketProvider } from '@contexts/socket'
import { AuthContextProvider } from '@contexts/AuthContext'

import { AppLoading } from '@components/AppLoading'

export default function App() {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
	})

	return (
		<NativeBaseProvider theme={THEME}>
			<AuthContextProvider>
				<SocketProvider>
					{!fontsLoaded ? <AppLoading /> : <Routes />}
				</SocketProvider>
			</AuthContextProvider>
		</NativeBaseProvider>
	)
}
