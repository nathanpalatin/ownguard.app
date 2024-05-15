import { StyleSheet, Dimensions } from 'react-native'

const DIMENSIONS = Dimensions.get('window')
export const SHEET_HEIGHT = 50
export const SHEET_OVER_DRAG = 0

export const styles = StyleSheet.create({
	container: {
		height: 550,
		width: DIMENSIONS.width,
		backgroundColor: '#000',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
})
