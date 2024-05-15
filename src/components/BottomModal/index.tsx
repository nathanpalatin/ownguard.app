import { theme } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { GestureDetector, Gesture } from 'react-native-gesture-handler'

import Animated, {
	useSharedValue,
	withSpring,
	withTiming,
	runOnJS,
	useAnimatedStyle,
	SlideInDown,
	SlideOutDown,
} from 'react-native-reanimated'

import { styles, SHEET_HEIGHT, SHEET_OVER_DRAG } from './styles'

type Props = {
	onClose: () => void
	children: React.ReactNode
}

export function Sheet({ onClose, children }: Props) {
	const offset = useSharedValue(0)

	function close() {
		offset.value = 0
		onClose()
	}

	const pan = Gesture.Pan()
		.onChange((event) => {
			const offsetDelta = event.changeY + offset.value
			const clamp = Math.max(-SHEET_OVER_DRAG, offsetDelta)

			offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp)
		})
		.onFinalize(() => {
			if (offset.value < SHEET_HEIGHT / 3) {
				offset.value = withSpring(0)
			} else {
				offset.value = withTiming(2000, {}, () => {
					runOnJS(close)()
				})
			}
		})

	const translateY = useAnimatedStyle(() => ({
		transform: [{ translateY: offset.value }],
	}))

	return (
		<GestureDetector gesture={pan}>
			<Animated.View
				style={[styles.container, translateY]}
				entering={SlideInDown.springify().damping(95)}
				exiting={SlideOutDown}
			>
				<MaterialCommunityIcons
					name="react"
					color={theme.colors.gray[500]}
					size={24}
					style={{ alignSelf: 'center', margin: 10 }}
				/>
				{children}
			</Animated.View>
		</GestureDetector>
	)
}
