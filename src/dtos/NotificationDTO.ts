export interface FbToken {
	fbId?: number
	fbToken: string
	fbUserId: number
	platform?: string
	apnToken?: string | null
}

export interface TypeNotification {
	type?: 'CHAT_MESSAGE'
	postHexId?: string
	user?: number
	userNickname?: string
	channelToken?: string
	channel?: string
	chatParticipantUserId?: number
	userId?: number
}

export interface NotificationMessage {
	messageCummomId: string
	chatRoomId: string
	userId: number
}
