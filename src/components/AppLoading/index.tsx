import { ImageBackground } from 'react-native'

export function AppLoading() {
	return (
		<ImageBackground
			style={{ flex: 1 }}
			defaultSource={require('@assets/background.png')}
		/>
	)
}
