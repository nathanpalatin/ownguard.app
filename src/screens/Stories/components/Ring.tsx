import { useEffect } from 'react'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

type RingPropType = {
	index: number
}

const Ring = (props: RingPropType) => {
	const { index } = props
	const opacityValue = useSharedValue(1)
	const scaleValue = useSharedValue(1)

	useEffect(() => {
		opacityValue.value = withDelay(
			index * 600,
			withRepeat(
				withTiming(0, {
					duration: 2000,
				}),
				-1,
				false,
			),
		)
		scaleValue.value = withDelay(
			index * 600,
			withRepeat(
				withTiming(4, {
					duration: 2000,
				}),
				-1,
				false,
			),
		)
	}, [opacityValue, scaleValue, index])

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: scaleValue.value,
				},
			],
			opacity: opacityValue.value,
		}
	})

	return (
		<Animated.View
			style={rStyle}
			className="w-56 h-56 rounded-full bg-purple-900 absolute"
		/>
	)
}

export default Ring
