import {
	ImageBackground,
	View,
	Text,
	Image,
	ScrollView,
	Pressable,
} from 'react-native'

import { Edit, Edit2Icon, Settings } from 'lucide-react-native'

import { useAuth } from '@hooks/useAuth'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { UserPhotoSecondary } from '@components/UserPhotoSecondary'
import defaultYUserPhotoImg from '@assets/userPhotoDefault.png'

export function Profile() {
	const navigation = useNavigation<AppNavigatorRoutesProps>()
	const { user } = useAuth()

	return (
		<ImageBackground
			source={require('@assets/background-profile.png')}
			className="flex-1"
		>
			<View className="mt-24 px-8">
				<View className="flex flex-row mb-6 gap-6 items-end justify-end">
					<Pressable onPress={() => navigation.push('editProfile')}>
						<Edit2Icon color={'#fff'} size={20} />
					</Pressable>
					<Pressable onPress={() => navigation.push('settings')}>
						<Settings color={'#fff'} size={20} />
					</Pressable>
				</View>
				<View className="flex-row gap-6">
					<View className="shadow-lg">
						<UserPhotoSecondary
							source={user.avatar ? { uri: user.avatar } : defaultYUserPhotoImg}
						/>
					</View>
					<View className="flex-col gap-1">
						<Text className="text-zinc-100 font-bold">{user.name}</Text>
						<Text className="text-zinc-100 text-sm">{user.email}</Text>
						<Text className="text-zinc-100 text-sm">
							{user.city} {user.state}
						</Text>
						<Text className="text-zinc-100 text-sm">{user.favorite_club}</Text>
						{user.padel_level && (
							<View
								className={`${user.padel_level === 'Competidor iniciante' ? 'bg-green-700' : 'bg-blue-700'} rounded-full px-3 py-1`}
							>
								<Text className="text-zinc-100 text-xs">
									{user.padel_level}
								</Text>
							</View>
						)}
					</View>
				</View>
				<View className="border-t border-b border-zinc-100/20 mt-3 w-full">
					<View className="justify-between p-1 flex-row">
						<View>
							<Text className="text-zinc-100 text-center text-lg font-bold">
								Torneios
							</Text>
							<Text className="text-center text-primary text-2xl font-normal">
								10
							</Text>
						</View>
						<View>
							<Text className="text-zinc-100 text-center text-lg font-bold">
								Ranking
							</Text>
							<Text className="text-center text-primary text-2xl font-normal">
								580º
							</Text>
						</View>
						<View>
							<Text className="text-zinc-100 text-center text-lg font-medium">
								Jogos
							</Text>
							<Text className="text-center font-normal text-primary text-2xl ">
								1205
							</Text>
						</View>
					</View>
				</View>
				<ScrollView>
					<View className="mt-20">
						<Text className="text-zinc-500 font-medium">
							Equipamento <Edit size={14} color={'#00000050'} />
						</Text>
						<View className="flex-row items-end gap-4">
							<Text className="font-bold mb-6 w-20 text-zinc-400">
								Raquete Padel 700
							</Text>
							<Image alt="" source={require('@assets/raquete.png')} />
						</View>

						<View className="mt-4 w-80">
							<View className="flex-row py-2 border-t border-b border-zinc-400/30  justify-between">
								<Text className="text-zinc-400 font-bold">
									QUADRA PREFERIDA
								</Text>
								<Text className="text-zinc-400 font-bold">MVB 2</Text>
							</View>
							<View className="flex-row py-2 border-t border-b border-zinc-400/30  justify-between">
								<Text className="text-zinc-400 font-bold">EXPERIÊNCIA</Text>
								<Text className="text-zinc-400 font-bold">2 anos</Text>
							</View>
							<View className="flex-row py-2 border-t border-b border-zinc-400/30  justify-between">
								<Text className="text-zinc-400 font-bold">
									MELHOR COLOCAÇÃO
								</Text>
								<Text className="text-zinc-400 font-bold">3º lugar</Text>
							</View>
							<View className="flex-row py-2 border-t border-b border-zinc-400/30  justify-between">
								<Text className="text-zinc-400 font-bold">ÚLTIMO TORNEIO</Text>
								<Text className="text-zinc-400 font-bold">Aberto de BC</Text>
							</View>
							<View className="flex-row py-2 border-t border-b border-zinc-400/30  justify-between">
								<Text className="text-zinc-400 font-bold">TEMPO DE JOGO</Text>
								<Text className="text-zinc-400 font-bold">200 horas</Text>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</ImageBackground>
	)
}
