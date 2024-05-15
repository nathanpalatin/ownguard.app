import { Input } from '@components/Input'
import { IInputProps } from 'native-base'

interface SearchProps extends IInputProps {
	value: string
	onSetValue: (text: string) => void
}

export function SearchInput({ value, onSetValue, ...rest }: SearchProps) {
	return (
		<Input
			rounded={'full'}
			borderWidth={'0'}
			value={value}
			onChangeText={onSetValue}
			{...rest}
		/>
	)
}
