import { ImageBackground } from 'react-native'

export function AppLoading() {
	return (
		<ImageBackground style={{ flex: 1 }}
			source={require('@assets/background.png')}
			defaultSource={require('@assets/background.png')}
		/>
	)
}
