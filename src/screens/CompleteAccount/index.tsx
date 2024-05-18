import { useEffect, useState } from 'react'
import { ImageBackground, Pressable, View, Text } from 'react-native'
import { useToast } from 'native-base'

import { AppError } from '@utils/AppError'

type FormData = {
	email: string
}

export function CompleteAccount() {
	const toast = useToast()

	const [timeSendNewCode, setTimeSendNewCode] = useState<number>(59)

	async function handleCompleteAccount({ email }: FormData) {
		try {
			console.log(email)
		} catch (error) {
			const isAppError = error instanceof AppError
			const title = isAppError
				? 'Credenciais inválidas.'
				: 'Erro no servidor. Tente novamente mais tarde.'

			toast.show({
				title,
				placement: 'bottom',
				bgColor: 'red.800',
				borderRadius: 16,
				marginBottom: 100,
			})
		}
	}

	const countdown = () => {
		let seconds = 59
		// eslint-disable-next-line no-var
		var countdownInterval = setInterval(function () {
			setTimeSendNewCode(seconds--)
			if (seconds < 0) {
				clearInterval(countdownInterval)
			}
		}, 1500)
	}

	useEffect(() => {
		countdown()
	}, [])

	return (
		<ImageBackground
			defaultSource={require('@assets/background.png')}
			className="flex-1"
		>
			<View className="flex-1 px-10 py-20">
				<View className="my-40 justify-center items-center pt-10 pb-4 px-8">
					<Text className="text-zinc-100 text-xl font-bold mb-6">
						Conta criada com sucesso!
					</Text>
					<Text className="text-zinc-100 text-center">
						Verifique sua caixa de entrada e confirme seu email.
					</Text>

					<Text className="text-5xl text-zinc-100 font-bold my-6">
						{timeSendNewCode}
					</Text>

					<Pressable onPress={() => handleCompleteAccount}>
						<Text className="text-zinc-100">
							Não recebeu? <Text className="font-bold">Reenviar</Text>
						</Text>
					</Pressable>
				</View>
			</View>
		</ImageBackground>
	)
}
