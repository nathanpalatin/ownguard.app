import { NativeBaseProvider } from 'native-base'

import 'react-native-gesture-handler'

import './global.css'

import {
	Manrope_400Regular,
	Manrope_500Medium,
	Manrope_700Bold,
} from '@expo-google-fonts/manrope'

import { useFonts } from 'expo-font'

import { THEME } from './src/theme'

import { Routes } from './src/routes'

import { SocketProvider } from '@contexts/socket'
import { AuthContextProvider } from '@contexts/AuthContext'

import { AppLoading } from '@components/AppLoading'

export default function App() {
	const [fontsLoaded] = useFonts({
		Manrope_400Regular,
		Manrope_500Medium,
		Manrope_700Bold,
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
