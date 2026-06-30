const KEY = "bookmarks"

export function getBookmarks(): string[] {
	const raw = localStorage.getItem(KEY)
	return raw ? JSON.parse(raw) : []
}

export function isBookmarked(id: string): boolean {
	return getBookmarks().includes(id)
}

export function toggleBookmark(id: string) {
	const current = getBookmarks()

	let updated: string[]

	if (current.includes(id)) {
		updated = current.filter((x) => x !== id)
	} else {
		updated = [...current, id]
	}

	localStorage.setItem(KEY, JSON.stringify(updated))
}