export function formatTime(dateString: string, now = new Date()) {
	const date = new Date(dateString)

	const diffInMs = now.getTime() - date.getTime()
	const diffInMinutes = Math.floor(diffInMs / 1000 / 60)
	const diffInHours = Math.floor(diffInMinutes / 60)

	// const diffInDays = Math.floor(diffInHours / 24)

	if (diffInMinutes < 60) {
		return `${diffInMinutes}m ago`
	}

	if (diffInHours < 24) {
		return `${diffInHours}h ago`
	}

	// Older than 24h → show date instead (simple + readable)
	//return `${diffInDays}d ago`
	return date.toLocaleDateString()
}