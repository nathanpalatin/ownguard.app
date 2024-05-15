import { useState } from 'react'
import {
	ImageBackground,
	Pressable,
	Text,
	View,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useToast } from 'native-base'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { createProfile } from '@services/serviceProfile'

import { AppError } from '@utils/AppError'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useAuth } from '@hooks/useAuth'

import Logo from '@assets/logo.png'
import { registerUser } from '@services/serviceAuth'

type FormDataProps = {
	name: string
	email: string
	password: string
	passwordConfirm: string
}

const signUpSchema = yup.object({
	name: yup.string().required('Informe o nome.'),
	email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
	password: yup
		.string()
		.required('Informe a senha')
		.min(6, 'A senha deve haver pelo menos 6 dígitos.'),
	passwordConfirm: yup
		.string()
		.required('Confirme a senha')
		.oneOf([yup.ref('password')], 'As senhas não conferem.'),
})

export function SignUp() {
	const toast = useToast()

	const { singIn } = useAuth()

	const [isLoading, setIsLoading] = useState(false)

	const navigation = useNavigation<AuthNavigatorRoutesProps>()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>({

		resolver: yupResolver(signUpSchema),
	})

	async function handleSignUp({ name, email, password }: FormDataProps) {
		try {
			setIsLoading(true)
			await registerUser(name, email, password)
			await createProfile({ name, email, sex: '', phone: '', padel_level: '', favorite_club: '', city: '', state: '', birthdate: '', cpf: '' })
			singIn(email, password)
		} catch (error) {
			setIsLoading(false)
			const isAppError = error instanceof AppError
			const title = isAppError ? error.message : 'Erro ao criar a conta'
			toast.show({
				title,
				placement: 'top',
				bgColor: 'red.500',
			})
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
				<ScrollView
					className="h-screen px-8"
					contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
					showsVerticalScrollIndicator={false}
				>
					<View className="shadow-lg bg-zinc-100/20 mb-4 justify-center items-center rounded-2xl pt-10 pb-4 px-4">
						<Image source={Logo} alt="logo" />
						<Text className="text-zinc-100 text-xl font-regular mb-6">
							Crie sua conta
						</Text>

						<Controller
							control={control}
							name="name"
							rules={{ required: 'Informe seu nome completo' }}
							render={({ field: { onChange } }) => (
								<Input
									placeholder="Digite seu nome"
									rounded={'full'}
									onChangeText={onChange}
									errorMessage={errors.name?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name="email"
							rules={{
								required: 'Informe o e-mail.',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'E-mail inválido.',
								},
							}}
							render={({ field: { onChange } }) => (
								<Input
									placeholder="Digite seu e-mail"
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
									placeholder="Digite sua senha"
									onChangeText={onChange}
									secureTextEntry
									errorMessage={errors.password?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name="passwordConfirm"
							rules={{
								required: 'Confirme a sua senha.',
							}}
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="Confirme sua senha"
									secureTextEntry
									onChangeText={onChange}
									value={value}
									onSubmitEditing={handleSubmit(handleSignUp)}
									returnKeyType="send"
									errorMessage={errors.passwordConfirm?.message}
								/>
							)}
						/>
					</View>

					<Pressable
						onPress={() => navigation.pop()}
						className="mb-10 self-center flex items-center gap-2"
					>
						<Text className="text-sm text-zinc-50 font-bold">
							Já tem uma conta?{' '}
							<Text className="text-50 font-bold">Acesse aqui</Text>
						</Text>
					</Pressable>
					<Button
						title="Criar conta"
						variant="outline"
						isLoading={isLoading}
						disabled={isLoading}
						onPress={handleSubmit(handleSignUp)}
					/>
				</ScrollView>
			</ImageBackground>
		</KeyboardAvoidingView>
	)
}
