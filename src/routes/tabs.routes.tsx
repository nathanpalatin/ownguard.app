import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { TabRoutesTypes } from '@dtos/TabRoutes'
import { Chats } from '@screens/Chats'

const Tab = createBottomTabNavigator<TabRoutesTypes>()

export default function TabNavigation(initialScreen: 'feed') {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				unmountOnBlur: true,
			}}
			initialRouteName={initialScreen}
		>
			<Tab.Screen
				name="feed"
				component={Chats}
				options={{
					tabBarHideOnKeyboard: true,
				}}
			/>
		</Tab.Navigator>
	)
}
