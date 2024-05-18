/* eslint-disable react-hooks/exhaustive-deps */
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

import { Radio, useToast } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { Button } from '@components/Button'
import { ScreenHeader } from '@components/ScreenHeader'
import { InputVariant } from '@components/InputSecondary'

import { useAuth } from '@hooks/useAuth'

import { AppError } from '@utils/AppError'

import { UserDTO } from '@dtos/UserDTO'

import { updateUser } from '@services/serviceProfile'
import { sendPhotoProfile, updatePhotoProfile } from '@services/serviceStorage'

import { updateAvatarInStorage } from '@storage/storageUser'

export function EditProfile() {
	const { user, updateUserProfile } = useAuth()

	const [openModal, setOpenModal] = useState<boolean>(false)

	const [, setUserPhoto] = useState('')

	const [formData, setFormData] = useState<UserDTO>({
		name: user.name,
		email: user.email,
		phone: user.phone ? user.phone : '',
		sex: user.sex ? user.sex : '',
		birthdate: user.birthdate ? user.birthdate : '',
		city: user.city ? user.city : '',
		state: user.state ? user.state : '',
		cpf: user.cpf ? user.cpf : '',
		padel_level: user.padel_level ? user.padel_level : '',
		favorite_club: user.favorite_club ? user.favorite_club : '',
	})

	const navigation = useNavigation<AppNavigatorRoutesProps>()

	const toast = useToast()

	async function handleProfileUpdate() {
		try {
			const padelLevelAsString = String(formData.padel_level)

			const updatedFormData = { ...formData, padel_level: padelLevelAsString }

			await updateUser(updatedFormData)
			const userUpdated = { ...user, ...updatedFormData }
			await updateUserProfile(userUpdated)
			navigation.navigate('profile')
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

				if (user.avatar) {
					await updatePhotoProfile(userPhotoUloadForm)
				} else {
					await sendPhotoProfile(userPhotoUloadForm)
				}

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
					avatar={user.avatar}
					handlePressOption={() => navigation.goBack()}
					logo
				/>

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: 36,
					}}
				>
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

							<View className="flex-col w-full">
								<View className="flex-row w-44 gap-8">
									<InputVariant
										variant
										label={'Sexo'}
										value={formData.sex}
										defaultValue={user.sex}
										onChangeText={(text) =>
											setFormData({ ...formData, sex: text })
										}
									/>

									<InputVariant
										variant
										keyboardType="numeric"
										value={formData.birthdate}
										label={'Data de nascimento'}
										defaultValue={user.birthdate}
										onChangeText={(text) =>
											setFormData({ ...formData, birthdate: text })
										}
									/>
								</View>
							</View>

							<View className="flex-row w-44 gap-8">
								<InputVariant
									variant
									label={'Cidade'}
									value={formData.city}
									defaultValue={user.city}
									onChangeText={(text) =>
										setFormData({ ...formData, city: text })
									}
								/>

								<InputVariant
									variant
									label={'Estado'}
									keyboardType="numeric"
									value={formData.state}
									defaultValue={user.state}
									onChangeText={(text) =>
										setFormData({ ...formData, state: text })
									}
								/>
							</View>

							<InputVariant
								variant
								label={'CPF'}
								value={formData.cpf}
								keyboardType="numeric"
								defaultValue={user.cpf}
								onChangeText={(text) => setFormData({ ...formData, cpf: text })}
							/>

							<Text className="text-left mt-6 font-bold text-lg">
								Suas habilidades de padel
							</Text>
							<View className="h-px w-full border border-zinc-100 my-2" />

							<View className="bg-bluevariant rounded-lg p-4">
								<Radio.Group
									onChange={(selectedValue: string) => {
										setFormData({ ...formData, padel_level: selectedValue })
									}}
									value={formData.padel_level}
									name="padel_level"
								>
									<View className="w-full border-b border-zinc-50 flex-row items-center justify-between">
										<Radio value="Iniciante" my={1}>
											<Text className="text-md text-zinc-50">Iniciante</Text>
										</Radio>
										<View className="w-12 h-6 rounded-full shadow bg-green-600" />
									</View>
									<View className="w-full border-b border-zinc-50 flex-row items-center justify-between">
										<Radio value="Intermediário" my={1}>
											<Text className="text-md text-zinc-50">
												Intermediário
											</Text>
										</Radio>
										<View className="w-12 h-6 rounded-full shadow bg-yellow-500" />
									</View>

									<View className="w-full border-b border-zinc-50 flex-row items-center justify-between">
										<Radio value="Avançado" my={1}>
											<Text className="text-md text-zinc-50">Avançado</Text>
										</Radio>
										<View className="w-12 h-6 rounded-full shadow bg-red-500" />
									</View>

									<View className="w-full border-b border-zinc-50 flex-row items-center justify-between">
										<Radio value="Competidor iniciante" my={1}>
											<Text className="text-md text-zinc-50">
												Competidor iniciante
											</Text>
										</Radio>
										<View className="w-12 h-6 rounded-full shadow bg-pink-500" />
									</View>

									<View className="w-full flex-row items-center justify-between">
										<Radio value="Competidor avançado" my={1}>
											<Text className="text-md text-zinc-50">
												Competidor avançado
											</Text>
										</Radio>
										<View className="w-12 h-6 rounded-full shadow bg-zinc-700" />
									</View>
								</Radio.Group>
							</View>

							<Text className="text-left mt-6 font-bold text-lg">
								Seu clube de padel preferido
							</Text>
							<View className="h-px w-full border border-zinc-100 my-2" />

							<InputVariant
								variant
								label={'Nome do clube'}
								keyboardType="numeric"
								value={formData.favorite_club}
								defaultValue={user.favorite_club}
								onChangeText={(text) =>
									setFormData({ ...formData, favorite_club: text })
								}
							/>

							<View className="flex flex-row justify-end gap-4 mt-10">
								<Button
									title="Cancelar"
									variant="solid"
									onPress={() => navigation.goBack()}
								/>
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
				animationInTiming={600}
				animationOutTiming={600}
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
