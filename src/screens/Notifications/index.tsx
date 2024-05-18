import { ScreenHeader } from '@components/ScreenHeader'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

export function Notifications() {
	const navigation = useNavigation<AppNavigatorRoutesProps>()
	return (
		<ScreenHeader
			title="Notificações"
			handlePressOption={() => navigation.goBack()}
		/>
	)
}
