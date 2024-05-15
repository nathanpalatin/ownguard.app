import { View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { ScreenHeader } from '@components/ScreenHeader'

export function Chats() {
	const navigation = useNavigation<AppNavigatorRoutesProps>()
	return (
		<View>
			<ScreenHeader title="Mensagens" handlePress={() => navigation.pop()} />
		</View>
	)
}
