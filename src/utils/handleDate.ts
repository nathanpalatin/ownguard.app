import { format } from 'date-fns'

export const formatDate = (dateString: Date) => {
	const date = new Date(dateString)
	return format(date, 'HH:mm')
}

export const getDateMsg = (dateString: Date | string) => {
	const postTime = new Date(dateString)

	const offsetInMinutes = 180
	postTime.setMinutes(postTime.getMinutes() + offsetInMinutes)

	const today = new Date()
	today.setMinutes(today.getMinutes() + offsetInMinutes)

	const yesterday = new Date(today)
	yesterday.setDate(today.getDate() - 1)

	const options = { day: 'numeric', month: 'short' }

	const dataOriginal = dateString

	const dataObj = new Date(dataOriginal)
	const diasDaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
	const diaDaSemana = diasDaSemana[dataObj.getDay()]

	if (
		postTime.getDate() === today.getDate() &&
		postTime.getMonth() === today.getMonth() &&
		postTime.getFullYear() === today.getFullYear()
	) {
		return 'Hoje'
	} else if (
		postTime.getDate() === yesterday.getDate() &&
		postTime.getMonth() === yesterday.getMonth() &&
		postTime.getFullYear() === yesterday.getFullYear()
	) {
		return 'Ontem'
	} else {
		const formattedDate = postTime.toLocaleDateString('pt-BR', options)
		return `${diaDaSemana}, ${formattedDate}`
	}
}

export const handleTime = (time: string) => {
	const postTime: Date = new Date(time)
	const now: Date = new Date()
	const diferenceInMilliSeconds: number = now.getTime() - postTime.getTime()

	const seconds = Math.floor(diferenceInMilliSeconds / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)
	const diferenceInDays = diferenceInMilliSeconds / (1000 * 60 * 60 * 24)

	if (diferenceInDays > 7) {
		const weeks = Math.floor(diferenceInDays / 7)
		return `${weeks}sem`
	} else if (diferenceInDays < 1) {
		if (hours < 1) {
			if (minutes < 1) {
				return `${seconds + 2}s`
			} else {
				return `${minutes}m`
			}
		} else {
			return `${hours}h`
		}
	} else {
		return `${days}d`
	}
}
