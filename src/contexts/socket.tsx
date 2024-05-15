/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useRef, useState } from 'react'

import io, { Socket } from 'socket.io-client'

import { useAuth } from '@hooks/useAuth'

import { AllChat, AllMessage, CreateChat, MessageChat } from '@dtos/ChatDTO'

interface SocketContextData {
	getAllchat: () => void
	clearChat: () => void
	userId: number
	messageList: MessageChat[]
	chatList: CreateChat[]
	unreadedChats: number
	currentChat: CreateChat | undefined
	getUserOnline: (userId: number) => Promise<{ code: number; online: boolean }>
	handleSetChat: (chat: CreateChat) => void
	sendMessage: (message: string) => void
	isLoading: boolean
}

interface ServerToClientEvents {
	receivedMessage: (messageChat: MessageChat) => void
	newMessage: (messageChat: { message: MessageChat; chat: CreateChat }) => void
}

interface ClientToServerEvents {
	getOnline: (
		body: { userId: number },
		callback: (result: { code: number; online: boolean }) => void,
	) => void
	verifyChat: (
		createChat: { chatOwnerUserId?: number; chatParticipantUserId: number },
		callback: (result: {
			code: number
			chatRoomId: string
			chat: CreateChat
		}) => void,
	) => void
	sendMessage: (
		message: MessageChat,
		callback: (result: { code: number; messageCummomId: string }) => void,
	) => void
	getAllChat: (
		body: AllChat,
		callback: (result: {
			code: number
			chats: CreateChat[]
			solicitations: CreateChat[]
		}) => void,
	) => void
	getAllMessage: (
		body: AllMessage,
		callback: (result: { code: number; messages: MessageChat[] }) => void,
	) => void
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuth()

	const [userId, setUserId] = useState<number>(191)
	const [unreadedChats, setUnreadedChats] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [currentChat, setCurrentChat] = useState<CreateChat | undefined>(
		{} as CreateChat,
	)
	const [chatList, setChatList] = useState<CreateChat[]>([])

	const [pagechat, setPageChat] = useState<number>(1)

	const [messageList, setMessageList] = useState<MessageChat[]>([])

	const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>()

	const getAllchat = () => {
		socketRef.current?.emit(
			'getAllChat',
			{
				chatOwnerUserId: user.user_id,
				page: 1,
				limit: 50,
			},
			(result) => {
				setChatList(result.chats)
				const chats = result.chats.filter((chat) => chat.unreadMessagens > 0)
				setUnreadedChats(chats.length)
				setTimeout(() => {
					setIsLoading(false)
				}, 1200)
			},
		)
	}
	const sendMessage = (message: string) => {
		if (currentChat) {
			socketRef.current?.emit(
				'sendMessage',
				{
					userId: user.user_id,
					messageText: message,
					messageDate: new Date(),
					chatRoomId: currentChat.chatRoomId,
					messageState: 'send',
					messageUri: null,
					messageType: 'TEXT',
					configAudMetrics: '',
					configAudTime: 0,
				},
				(result) => {
					setMessageList((prev) => [
						...prev,
						{
							messageText: message,
							messageDate: new Date(),
							chatRoomId: currentChat.chatRoomId,
							userId: user.user_id,
							messageState: 'send',
							messageCummomId: result.messageCummomId,
							messageType: 'TEXT',
							messageUri: null,
							configAudMetrics: '',
							configAudTime: 0,
						},
					])
				},
			)
		}
	}

	function getUserOnline(
		userId: number,
	): Promise<{ code: number; online: boolean }> {
		return new Promise((resolve) => {
			socketRef.current?.emit(
				'getOnline',
				{
					userId,
				},
				(result) => {
					const data = { code: result.code, online: result.online }
					resolve(data)
				},
			)
		})
	}

	const clearChat = () => {
		setMessageList([])
		setCurrentChat(undefined)
		setPageChat(1)
	}

	const handleParticipantId = (id: number) => {
		socketRef.current?.emit(
			'verifyChat',
			{
				chatOwnerUserId: user.user_id,
				chatParticipantUserId: id,
			},
			(result) => {
				setCurrentChat(result.chat)
			},
		)
	}

	const handleSetChat = (chat: CreateChat) => {
		handleParticipantId(chat.chatParticipantUserId)
	}

	const getAllMessage = () => {
		if (currentChat) {
			socketRef.current?.emit(
				'getAllMessage',
				{
					chatRoomId: currentChat.chatRoomId,
					page: pagechat,
					limit: 10,
					userId,
				},
				(result) => {
					setPageChat(1)
					if (pagechat > 1) {
						setMessageList((prev) => [...result.messages, ...prev])
					} else {
						setMessageList(result.messages)
					}
				},
			)
		}
	}
	useEffect(() => {
		setTimeout(() => {
			setUserId(user.user_id ?? 0)
		}, 2400)
	}, [user])

	useEffect(() => {
		if (userId) {
			socketRef.current = io('https://chat.intellectus.app.br/chat', {
				query: {
					userId,
				},
			})

			socketRef.current.on('connect', () => {})

			socketRef.current.on('newMessage', (_messageChat) => {
				console.log('new message')
				setMessageList((prev) => [...prev, _messageChat.message])
			})

			socketRef.current.on('receivedMessage', (data: MessageChat) => {
				console.log('receivedMessage')
				if (currentChat) {
					setMessageList((prev) => [...prev, data])
				}
			})

			socketRef.current.on('disconnect', () => {
				console.log('disconnected!')
			})
		}
	}, [userId, currentChat])

	useEffect(() => {
		getAllchat()
	}, [userId])

	useEffect(() => {
		getAllMessage()
	}, [currentChat])

	return (
		<SocketContext.Provider
			value={{
				currentChat,
				handleSetChat,
				getAllchat,
				chatList,
				messageList,
				getUserOnline,
				userId,
				sendMessage,
				isLoading,
				unreadedChats,
				clearChat,
			}}
		>
			{children}
		</SocketContext.Provider>
	)
}

export const useSocket = () => useContext(SocketContext)
