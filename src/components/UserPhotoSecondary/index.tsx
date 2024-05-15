import { Image, ImageProps } from 'react-native'

type Props = ImageProps & {
	size?: number
}

export function UserPhotoSecondary({ ...rest }: Props) {
	return <Image className="w-44 h-32 rounded-lg" alt="photo file" {...rest} />
}
