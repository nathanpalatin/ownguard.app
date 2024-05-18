import { useAuth } from '@hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { View, Text, Pressable } from 'react-native'

export function Settings() {
	const navigation = useNavigation<AppNavigatorRoutesProps>()
	const { signOut } = useAuth()
	return (
		<View className="flex-1 bg-zinc-900 justify-start items-start p-8">
			<Text className="font-bold text-2xl text-zinc-100">Configurações</Text>
			<View className="mt-10 flex-col gap-3">
				<Pressable onPress={() => navigation.navigate('profile')}>
					<Text className="text-zinc-100">Alterar senha</Text>
				</Pressable>
				<Pressable onPress={() => navigation.navigate('stories')}>
					<Text className="text-zinc-100">Termos de uso</Text>
				</Pressable>
				<Pressable onPress={signOut}>
					<Text className="text-zinc-100">Sair</Text>
				</Pressable>
			</View>
		</View>
	)
}
