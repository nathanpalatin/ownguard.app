import { useState } from 'react'
import {
	Image,
	ImageBackground,
	Pressable,
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useToast } from 'native-base'

import { Controller, useForm } from 'react-hook-form'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'

import Logo from '@assets/logo.png'

type FormData = {
	email: string
	password: string
}

export function SignIn() {
	const { singIn } = useAuth()

	const toast = useToast()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>()

	const [isLoading, setIsLoading] = useState(false)

	const navigation = useNavigation<AuthNavigatorRoutesProps>()

	async function handleSignIn({ email, password }: FormData) {
		try {
			setIsLoading(true)
			await singIn(email, password)
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

	return (
		<KeyboardAvoidingView
			className="flex-1"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={-200}
		>
			<ImageBackground
				defaultSource={require('@assets/background-secondary.png')}
				source={require('@assets/background-secondary.png')}
				className="flex-1"
			>
				<View className="flex-1 px-10 py-20">
					<View className="shadow-lg bg-zinc-100/20 mt-40 mb-4 justify-center items-center rounded-2xl pt-10 pb-4 px-4">
						<Image source={Logo} alt="logo" />
						<Text className="text-zinc-100 text-xl font-regular mb-6">
							Acesse sua conta
						</Text>

						<Controller
							control={control}
							name="email"
							rules={{ required: 'Informe o e-mail' }}
							render={({ field: { onChange } }) => (
								<Input
									placeholder="Usuário"
									rounded={'full'}
									onChangeText={onChange}
									errorMessage={errors.email?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name="password"
							rules={{ required: 'Informe a senha' }}
							render={({ field: { onChange } }) => (
								<Input
									placeholder="Senha"
									onChangeText={onChange}
									secureTextEntry
									errorMessage={errors.password?.message}
								/>
							)}
						/>
					</View>

					<Pressable
						onPress={() => navigation.push('forgetPassword')}
						className="mb-10 self-center"
					>
						<Text className="text-sm text-zinc-50 font-bold">
							Esqueceu usuário ou senha?
						</Text>
					</Pressable>

					<Button
						title="Entrar"
						variant="outline"
						isLoading={isLoading}
						disabled={isLoading}
						onPress={handleSubmit(handleSignIn)}
					/>

					<Pressable className="mt-4" onPress={() => navigation.push('signUp')}>
						<Text className="text-sm text-zinc-100 font-bold text-center">
							Crie sua conta
						</Text>
					</Pressable>
				</View>
			</ImageBackground>
		</KeyboardAvoidingView>
	)
}
