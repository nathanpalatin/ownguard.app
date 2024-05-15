import {
	ActivityIndicator,
	ButtonProps,
	Text,
	TouchableOpacity,
} from 'react-native'

interface Props extends ButtonProps {
	variant: 'outline' | 'solid'
	isLoading?: boolean
}

// signin text-zinc-700 text-xl px-10 text-center
// logged text-xl font-regular

export function Button({ isLoading, variant, title, ...rest }: Props) {
	const buttonClasses = `
	px-6 py-2 self-center rounded-full
  
	${variant === 'outline' ? 'border border-primary shadow' : 'border border-secondary shadow'} 
  ${variant === 'outline' ? 'bg-primary' : 'bg-secondary'}`

	return (
		<TouchableOpacity className={buttonClasses} {...rest}>
			<Text
				className={`${variant ? 'text-lg font-bold' : 'text-sm'} text-zinc-600`}
			>
				{isLoading ? (
					<ActivityIndicator
						className="p-px"
						size={'small'}
						color={'bg-zinc-100'}
					/>
				) : (
					title
				)}
			</Text>
		</TouchableOpacity>
	)
}
