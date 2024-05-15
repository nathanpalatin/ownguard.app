export type ChatDTO = {
	name: string
	avatar: string
	lastMessage?: string
	read?: boolean
	time?: string
	id: number
}

export interface CreateChat {
	chatId: number
	chatOwnerUserId: number
	chatParticipantUserId: number
	chatSolicited: 0 | 1
	chatBlocked: 0 | 1
	chatAccepted: 0 | 1
	chatRoomId: string
	chatDate: Date | string
	profileImage: string
	userName: string
	userId: number
	userNickname: string
	lastMessage: string
	unreadMessagens: number
	lastMessageType: 'TEXT' | 'AUDIO' | 'FILE' | 'IMAGE'
	configAudTime?: number
}

export interface MessageUpdate {
	messageCummomId: string[]
	messageState: 'send' | 'delivered' | 'read'
	chatRoomId: string
}

export interface MessageChat {
	messageId?: number
	userId?: number
	messageDate: Date
	messageText: string
	forwarded?: boolean
	chatRoomId: string
	messageState?: 'send' | 'delivered' | 'read'
	messageOwnerId?: number
	messageCummomId?: string
	messageType: 'TEXT' | 'AUDIO' | 'FILE' | 'IMAGE'
	messageUri: string | number | null
	configAudMetrics: string
	configAudTime: number
	userName?: string
	userNickname?: string
	profileImage?: string
}
export interface AllMessage {
	userId: number
	chatRoomId: string | number
	page?: number
	limit?: number
}

export interface AllChat {
	chatOwnerUserId?: number
	page: number
	limit: number
}
