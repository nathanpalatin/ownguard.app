import { useAuth } from '@hooks/useAuth'
import { View, Text, Pressable } from 'react-native'

export function Settings() {
	const { signOut } = useAuth()
	return (
		<View className="justify-center items-start p-8">
			<Text className="font-bold text-2xl">Configurações</Text>
			<View className="mt-10 flex-col gap-3">
				<Pressable onPress={() => {}}>
					<Text>Alterar senha</Text>
				</Pressable>
				<Pressable onPress={() => {}}>
					<Text>Termos de uso</Text>
				</Pressable>
				<Pressable onPress={signOut}>
					<Text>Sair</Text>
				</Pressable>
			</View>
		</View>
	)
}
