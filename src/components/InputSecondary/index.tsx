import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

import { Text } from 'react-native'

type Props = IInputProps & {
	errorMessage?: string | null
	variant?: boolean
	label?: string
}

export function InputVariant({
	label,
	variant,
	errorMessage = null,
	isInvalid,
	...rest
}: Props) {
	const invalid = !!errorMessage || isInvalid

	return (
		<FormControl isInvalid={invalid} mb={'2'}>
			<Text className="font-medium text-sm mb-1 text-zinc-400">{label}</Text>
			<NativeBaseInput
				bg={'gray.50'}
				px={2}
				py={2}
				autoCapitalize={'none'}
				rounded={'lg'}
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
					bg: 'gray.50',
					placeholder: ' ',
					color: variant ? 'gray.500' : 'gray.100',
					borderColor: 'green.500',
				}}
				{...rest}
			/>
			<FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
		</FormControl>
	)
}
