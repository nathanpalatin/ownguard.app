export interface PostProps {
	name: string
	time: string
	legend: string
	image: string
	video?: boolean
	liked: boolean
	avatar?: string
	loading: boolean
	comments: number
}
