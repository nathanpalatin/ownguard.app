import { useState } from 'react'
import { ImageBackground, Pressable, View, Text } from 'react-native'
import { useToast } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Controller, useForm } from 'react-hook-form'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { AppError } from '@utils/AppError'

type FormData = {
	email: string
}

export function ForgetPassword() {
	const toast = useToast()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>()

	const [isLoading, setIsLoading] = useState(false)

	async function handleForgetPassword({ email }: FormData) {
		try {
			setIsLoading(true)
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
		} finally {
			setIsLoading(false)
		}
	}

	const navigation = useNavigation<AuthNavigatorRoutesProps>()
	return (
		<ImageBackground
			defaultSource={require('@assets/background.png')}
			source={require('@assets/background.png')}
			className="flex-1"
		>
			<View className="flex-1 px-10 pt-20">
				<View className="shadow-lg bg-zinc-100/20 mt-40 mb-4 justify-center items-center rounded-2xl pt-10 pb-4 px-4">
					<Text className="text-zinc-100 text-xl font-regular mb-6">
						Recupere seu acesso
					</Text>
					<Controller
						control={control}
						name="email"
						rules={{ required: 'Informe o e-mail' }}
						render={({ field: { onChange } }) => (
							<Input
								placeholder="Digite seu e-mail"
								rounded={'full'}
								onChangeText={onChange}
								errorMessage={errors.email?.message}
							/>
						)}
					/>
				</View>

				<Pressable onPress={() => navigation.goBack()}>
					<Text className="text-zinc-100 text-center">
						Lembrou a senha? <Text className="font-bold">Fazer login</Text>
					</Text>
				</Pressable>
				<View className="mt-20">
					<Button
						title="Enviar"
						variant="outline"
						disabled={isLoading}
						onPress={handleSubmit(handleForgetPassword)}
					/>
				</View>
			</View>
		</ImageBackground>
	)
}
