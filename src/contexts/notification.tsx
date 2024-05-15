import { createContext, useContext, useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { CreateChat, MessageChat, MessageUpdate } from '@dtos/ChatDTO'
import messaging, {
	FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import {
	FbToken,
	NotificationMessage,
	TypeNotification,
} from '@dtos/NotificationDTO'

import {
	Notifications,
	RegistrationError,
	Notification as RNNotification,
} from 'react-native-notifications'

import { Platform, RegisteredStyle } from 'react-native'

import notifee from '@notifee/react-native'

import { theme } from 'native-base'

import { useNavigation } from '@react-navigation/native'

interface NotificationContextData {
	sendNotificationMessage: (chatRoomId: string, messageCummomId: string) => void
}

const NotificationContext = createContext<NotificationContextData>(
	{} as NotificationContextData,
)

interface ServerToClientEvents {
	receivedMessage: (messageChat: MessageChat) => void
	newMessage: (messageChat: { message: MessageChat; chat: CreateChat }) => void
	readMessage: (message: MessageUpdate) => void
}

interface ClientToServerEvents {
	inicializeFbToken: (
		props: FbToken,
		callback: (result: { code: number }) => void,
	) => void
	sendNotificationMessage: (props: NotificationMessage) => void
}

export const NotificationProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [userId, setUserId] = useState<number>(141)
	const [fbToken, setFbToken] = useState('')
	const [apnToken, setApnToken] = useState(null)

	const navigation = useNavigation()

	const user = {
		userId: 141,
	}

	const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>()

	const updateBadgeCount = (count: number) => {
		const iOSBadgeCount = Math.max(0, count)
		notifee.setBadgeCount(iOSBadgeCount)
	}

	const getTokenMessenger = async () => {
		Notifications.registerRemoteNotifications()
		Notifications.events().registerRemoteNotificationsRegistered(
			(event: RegisteredStyle) => {
				setApnToken(event.deviceToken)
			},
		)
		Notifications.events().registerRemoteNotificationsRegistrationFailed(
			(event: RegistrationError) => {
				console.error(event)
			},
		)

		const token = await messaging().getToken()
		setFbToken(token)

		await messaging().onTokenRefresh((newToken) => {
			console.log(`user new Token`, newToken)
		})
	}

	const inicializeFbToken = () => {
		socketRef.current?.emit(
			'inicializeFbToken',
			{
				fbToken,
				platform: Platform.OS,
				apnToken,
				fbUserId: userId,
			},
			(props) => {
				console.log('firebase Token result', props)
			},
		)
	}

	useEffect(() => {
		Notifications.events().registerNotificationReceivedBackground(
			(notification: RNNotification) => {
				console.log(
					'Notification Received - Background',
					notification.payload.data,
				)
				const remoteMessage = notification.payload
				if (remoteMessage?.data?.type === 'CALLING') {
					if (Platform.OS == 'ios') {
						console.log('ligando')
						/*   setCallStore({
                        user: remoteMessage.data.user,
                        channel: remoteMessage.data.channel,
                        channelToken: remoteMessage.data.channelToken,
                        uuid: remoteMessage.identifier
                    }) */
						// RNCallKeep.displayIncomingCall(remoteMessage.identifier, remoteMessage.callerName, '', undefined);
					}
				}
			},
		)
	}, [])

	const navigationChat = (userId: number) => {
		navigation.navigate('chat', { userId })
	}

	useEffect(() => {
		messaging().onNotificationOpenedApp((remoteMessage) => {
			verifyNotificationAction(remoteMessage.data as TypeNotification)
		})

		messaging()
			.getInitialNotification()
			.then((remoteMessage) => {
				if (remoteMessage) {
					verifyNotificationAction(remoteMessage.data as TypeNotification)
				}
			})
			.catch((e) => {
				console.warn('getInitialNotification - NotificationProvider')
				console.log(e)
			})
	}, [])

	useEffect(() => {
		setUserId(user.userId)
		permissionIOS()
		getTokenMessenger()

		const unsubscribe = messaging().onMessage(onMessageReceived)
		return () => {
			unsubscribe()
		}
	}, [user])

	useEffect(() => {
		if (userId && fbToken) {
			socketRef.current = io(
				'https://notifications.intellectus.app.br/notification',
				{
					query: {
						userId,
					},
				},
			)

			socketRef.current.on('connect', () => {
				inicializeFbToken()
			})

			socketRef.current.on('newMessage', (messageChat) => {
				updateBadgeCount(1)
				notifee.displayNotification({
					title: messageChat.chat.userNickname,
					body: messageChat.message.messageText,
					android: {
						channelId: 'messages',
						color: theme.colors.rose[400],
						colorized: true,
					},
					ios: {
						sound: 'default',
						badgeCount: 1,
						foregroundPresentationOptions: {
							alert: true,
							badge: true,
							sound: true,
						},
					},
				})
			})

			return () => {
				socketRef.current?.disconnect()
			}
		}
	}, [userId, fbToken])

	const permissionIOS = async () => {
		const result = await messaging().hasPermission()

		if (result !== messaging.AuthorizationStatus.AUTHORIZED) {
			await messaging().requestPermission()
		}

		if (result === messaging.AuthorizationStatus.AUTHORIZED) {
			console.log('autorizado')
		}
	}

	const verifyNotificationAction = (bodyNotification: TypeNotification) => {
		switch (bodyNotification.type) {
			case 'CHAT_MESSAGE':
				bodyNotification.userId && navigationChat(bodyNotification.userId)
				break
		}
	}

	const onMessageReceived = async (
		remoteMessage: FirebaseMessagingTypes.RemoteMessage,
	) => {
		if (
			remoteMessage?.notification?.title &&
			remoteMessage?.notification?.body
		) {
			await notifee.displayNotification({
				title: 'Chat',
				body:
					remoteMessage.notification.title +
					' ' +
					remoteMessage.notification.body,
				data: remoteMessage.data,
				android: {
					channelId: remoteMessage.notification.android?.channelId,
					colorized: true,
				},
				ios: {
					sound: 'default',
					badgeCount: 1,
					foregroundPresentationOptions: {
						alert: true,
						badge: true,
						sound: true,
					},
				},
			})
		}
	}

	const sendNotificationMessage = (
		chatRoomId: string,
		messageCummomId: string,
	) => {
		socketRef.current?.emit('sendNotificationMessage', {
			chatRoomId,
			messageCummomId,
			userId,
		})
	}

	return (
		<NotificationContext.Provider
			value={{
				sendNotificationMessage,
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}

export const useNotification = () => useContext(NotificationContext)
