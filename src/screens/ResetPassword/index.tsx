import { useState } from 'react'
import { ImageBackground, Pressable, View, Text } from 'react-native'
import { Icon, useToast } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Entypo } from '@expo/vector-icons'

import { Controller, useForm } from 'react-hook-form'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { AppError } from '@utils/AppError'

type FormData = {
	email: string
}

export function ResetPassword() {
	const toast = useToast()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>()

	const [isLoading, setIsLoading] = useState(false)

	async function handleResetPassword({ email }: FormData) {
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
			className="flex-1"
		>
			<View className="flex-1 px-10 py-20">
				<View className="flex flex-row justify-start items-center">
					<Pressable
						className="flex flex-row items-center"
						onPress={() => navigation.goBack()}
					>
						<Icon
							as={Entypo}
							mr={'1.5'}
							name="arrow-long-left"
							color={'gray.100'}
						/>
						<Text className="text-lg text-zinc-100 font-bold">voltar</Text>
					</Pressable>
				</View>

				<View className="shadow-lg bg-zinc-100/20 my-40 justify-center items-center rounded-2xl pt-10 pb-4 px-4">
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

				<Button
					title="Enviar"
					variant="outline"
					disabled={isLoading}
					onPress={handleSubmit(handleResetPassword)}
				/>
			</View>
		</ImageBackground>
	)
}
