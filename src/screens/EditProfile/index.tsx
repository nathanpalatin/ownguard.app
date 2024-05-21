import { useState } from 'react'
import {
	Text,
	View,
	Platform,
	KeyboardAvoidingView,
	ScrollView,
	Pressable,
} from 'react-native'

import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'

import Modal from 'react-native-modal'

import { useToast } from 'native-base'

import { Button } from '@components/Button'
import { ScreenHeader } from '@components/ScreenHeader'
import { InputVariant } from '@components/InputSecondary'

import { useAuth } from '@hooks/useAuth'
import { UserDTO } from '@dtos/UserDTO'

import { AppError } from '@utils/AppError'

import { updateUser } from '@services/serviceProfile'
import { sendPhotoProfile, updatePhotoProfile } from '@services/serviceStorage'

import { updateAvatarInStorage } from '@storage/storageUser'

export function EditProfile() {
	const { user, updateUserProfile } = useAuth()
	const toast = useToast()
	const [openModal, setOpenModal] = useState<boolean>(false)

	const [userPhoto, setUserPhoto] = useState('')

	const [formData, setFormData] = useState<UserDTO>({
		name: user.name,
		email: user.email,
		phone: user.phone ? user.phone : '',
		cpf: user.cpf ? user.cpf : '',
	})

	async function handleProfileUpdate() {
		try {
			await updateUser(formData)
			const userUpdated = { ...user, ...formData }
			await updateUserProfile(userUpdated)
			toast.show({
				title: 'Dados atualizados!',
				placement: 'top',
				bgColor: 'green.500',
			})
		} catch (error) {
			const isAppError = error instanceof AppError
			const title = isAppError
				? error.message
				: 'Não foi possível atualizar os dados. Tente novamente mais tarde.'
			toast.show({
				title,
				placement: 'top',
				bgColor: 'red.500',
			})
		}
	}

	async function openCamera() {
		const result = await ImagePicker.launchCameraAsync({
			quality: 1,
			aspect: [4, 4],
			allowsEditing: true,
			selectionLimit: 1,
		})

		if (result.canceled) return

		if (result.assets[0].uri) {
			await FileSystem.getInfoAsync(result.assets[0].uri)

			const fileExtension = result.assets[0].uri.split('.').pop()

			const photoFile = {
				name: `${user.name}.${fileExtension}`.toLowerCase().replace(' ', ''),
				uri: result.assets[0].uri,
				type: `${result.assets[0].type}/${fileExtension}`,
			} as never

			const userPhotoUloadForm = new FormData()
			userPhotoUloadForm.append('file', photoFile)

			if (user.avatar) {
				await updatePhotoProfile(userPhotoUloadForm)
			} else {
				await sendPhotoProfile(userPhotoUloadForm)
			}

			updateAvatarInStorage(result.assets[0].uri)
			setUserPhoto(result.assets[0].uri)

			toast.show({
				title: 'Foto alterada com sucesso!',
				placement: 'top',
				bgColor: 'green.700',
			})
		}
	}

	async function openGalery() {
		try {
			const photoSelected = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
				aspect: [4, 4],
				allowsEditing: true,
				selectionLimit: 1,
			})

			if (photoSelected.canceled) {
				setOpenModal(!openModal)
				return
			}

			if (photoSelected.assets[0].uri) {
				await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

				const fileExtension = photoSelected.assets[0].uri.split('.').pop()

				const photoFile = {
					name: `${user.name}.${fileExtension}`.toLowerCase().replace(' ', ''),
					uri: photoSelected.assets[0].uri,
					type: `${photoSelected.assets[0].type}/${fileExtension}`,
				} as never

				const userPhotoUloadForm = new FormData()
				userPhotoUloadForm.append('file', photoFile)

				await sendPhotoProfile(userPhotoUloadForm)

				updateAvatarInStorage(photoSelected.assets[0].uri)
				setUserPhoto(photoSelected.assets[0].uri)

				toast.show({
					title: 'Foto alterada com sucesso!',
					placement: 'top',
					bgColor: 'green.700',
				})
			}
		} catch (error) {
			toast.show({
				title: 'Ops, algo deu errado.',
				placement: 'top',
				bgColor: 'red.700',
			})
		}
	}

	return (
		<KeyboardAvoidingView
			className="flex-1"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={-10}
		>
			<View className="flex-1 bg-zinc-50 pb-2">
				<ScreenHeader
					secondOption
					avatar={userPhoto ?? user.avatar}
					handlePressOption={() => setOpenModal(!openModal)}
					logo
				/>

				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="px-8 mt-3">
						<Text className="text-left font-bold text-xl">Seu perfil</Text>
						<View className="h-px w-full border border-zinc-100 my-2" />
						<Text className="text-sm text-zinc-400">
							Complete seus dados. Você pode fazer alterações no seu perfil em
							qualquer momento.
						</Text>

						<View className="mt-10">
							<Text className="text-left font-bold text-lg">
								Informações do usuário
							</Text>
							<View className="h-px w-full border border-zinc-100 my-2" />

							<InputVariant
								variant
								isRequired
								defaultValue={formData.name}
								label={'Nome'}
								value={formData.name}
								onChangeText={(text) =>
									setFormData({ ...formData, name: text })
								}
							/>

							<InputVariant
								variant
								isRequired
								value={formData.email}
								defaultValue={user.email}
								label={'E-mail'}
								onChangeText={(text) =>
									setFormData({ ...formData, email: text })
								}
							/>

							<InputVariant
								variant
								label={'Telefone'}
								value={formData.phone}
								defaultValue={user.phone}
								onChangeText={(text) =>
									setFormData({ ...formData, phone: text })
								}
							/>

							<InputVariant
								variant
								label={'CPF'}
								value={formData.cpf}
								keyboardType="numeric"
								defaultValue={user.cpf}
								onChangeText={(text) => setFormData({ ...formData, cpf: text })}
							/>

							<View className="flex flex-row justify-end gap-4 mt-10">
								<Button
									onPress={handleProfileUpdate}
									variant="outline"
									title="Salvar"
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
			<Modal
				isVisible={openModal}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				backdropColor="#000000aa"
				backdropOpacity={1}
				animationInTiming={500}
				animationOutTiming={500}
				style={{ margin: 0, padding: 0, justifyContent: 'flex-end' }}
				onBackdropPress={() => setOpenModal(!openModal)}
			>
				<View className="bg-zinc-100 absolute w-full pt-4 pb-16 px-10 rounded-2xl">
					<Text className="font-bold">Alterar foto</Text>
					<View className="mt-6 flex flex-col gap-3">
						<Pressable
							onPress={() => {
								setOpenModal(!openModal)
								setTimeout(() => {
									openGalery()
								}, 800)
							}}
						>
							<Text>Galeria de fotos</Text>
						</Pressable>
						<Pressable
							onPress={() => {
								setOpenModal(!openModal)
								setTimeout(() => {
									openCamera()
								}, 800)
							}}
						>
							<Text>Camera</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</KeyboardAvoidingView>
	)
}
