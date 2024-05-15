import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

type Props = IInputProps & {
	errorMessage?: string | null
	variant?: boolean
}

export function Input({
	variant,
	errorMessage = null,
	isInvalid,
	...rest
}: Props) {
	const invalid = !!errorMessage || isInvalid

	return (
		<FormControl isInvalid={invalid} mb={'2'}>
			<NativeBaseInput
				bg={'gray.100'}
				px={6}
				py={3}
				autoCapitalize={'none'}
				rounded={'full'}
				fontSize="sm"
				color={'gray.500'}
				fontWeight={variant ? 'medium' : 'extrabold'}
				placeholderTextColor={'#00000030'}
				isInvalid={invalid}
				borderWidth={2}
				_invalid={{
					borderWidth: 1,
					borderColor: 'red.500',
				}}
				_focus={{
					bg: variant ? '#ffffff30' : 'gray.100',
					placeholder: ' ',
					color: variant ? 'gray.500' : 'gray.500',
					borderColor: 'green.500',
				}}
				{...rest}
			/>
			<FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
		</FormControl>
	)
}
