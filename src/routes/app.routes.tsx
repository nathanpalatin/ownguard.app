import {
	NativeStackNavigationProp,
	createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { Home } from '@screens/Home'
import { Chats } from '@screens/Chats'
import { Logged } from '@screens/Logged'
import { Profile } from '@screens/Profile'
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
			initialRouteName="logged"
		>
			<Group>
				<Screen name="home" component={Home} />
				<Screen name="chats" component={Chats} />
				<Screen name="logged" component={Logged} />
				<Screen name="profile" component={Profile} />
				<Screen name="editProfile" component={EditProfile} />
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
