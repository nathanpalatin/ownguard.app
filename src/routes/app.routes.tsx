import {
	NativeStackNavigationProp,
	createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { Home } from '@screens/Home'
import { Chats } from '@screens/Chats'
import { Stories } from '@screens/Stories'
import { Settings } from '@screens/Settings'
import { EditProfile } from '@screens/EditProfile'
import { Notifications } from '@screens/Notifications'

import { AppRoutesTypes } from '@dtos/AppRoutes'

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesTypes>

const { Navigator, Screen, Group } =
	createNativeStackNavigator<AppRoutesTypes>()

export function AppRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				autoHideHomeIndicator: true,
			}}
			initialRouteName="home"
		>
			<Group>
				<Screen name="home" component={Home} />
				<Screen name="chats" component={Chats} />
				<Screen name="editProfile" component={EditProfile} />
				<Screen name="stories" component={Stories} />

				<Screen name="notifications" component={Notifications} />
			</Group>

			<Group
				screenOptions={{
					presentation: 'modal',
				}}
			>
				<Screen name="settings" component={Settings} />
			</Group>
		</Navigator>
	)
}
