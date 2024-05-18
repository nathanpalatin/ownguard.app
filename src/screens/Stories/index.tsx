import { View, Text, Image } from 'react-native'

import Ring from './components/Ring'

export function Stories() {
	return (
		<View className="bg-zinc-950 flex-1 justify-center items-center">
			<View>
				{[...Array(10).keys()].map((_, index) => (
					<Ring key={index} index={index} />
				))}
				<Image
					alt="pr"
					source={{
						uri: 'https://pps.whatsapp.net/v/t61.24694-24/394411739_302440059399727_641757909638020805_n.jpg?ccb=11-4&oh=01_Q5AaIBqU2a2CHeceaaGKozSnvm1mtImxmgEDzr0ijBHMuPrn&oe=6651BB3D&_nc_sid=e6ed6c&_nc_cat=107',
					}}
					className="w-56 h-56 rounded-full"
				/>
			</View>
			<Text className="mt-10 text-xl text-zinc-50 font-bold">
				Nathan is calling...
			</Text>
		</View>
	)
}
