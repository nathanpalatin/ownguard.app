import * as Notifications from 'expo-notifications'
import * as ImagePicker from 'expo-image-picker'

async function getPermissions() {
	try {
		const { status: notificationStatus } =
			await Notifications.getPermissionsAsync()
		let finalNotificationStatus = notificationStatus

		if (notificationStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync()
			finalNotificationStatus = status
		}

		if (finalNotificationStatus !== 'granted') {
			console.log('Permissão para notificações não concedida')
			return
		}

		const { status: galleryStatus } =
			await ImagePicker.requestMediaLibraryPermissionsAsync()

		if (galleryStatus !== 'granted') {
			console.log('Permissão para acessar a galeria não concedida')
			return
		}

		const { status: cameraStatus } =
			await ImagePicker.requestCameraPermissionsAsync()

		if (cameraStatus !== 'granted') {
			console.log('Permissão para acessar a câmera não concedida')
			return
		}

		const token = (await Notifications.getExpoPushTokenAsync()).data
		console.log('Token de notificação:', token)
	} catch (error) {
		console.log('Erro ao solicitar permissões:', error)
	}
}

export { getPermissions }
