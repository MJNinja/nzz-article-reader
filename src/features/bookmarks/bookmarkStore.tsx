const KEY = "bookmarks"

export type BookmarkItem = {
	id: string
	savedAt: number
}

export function getBookmarks(): BookmarkItem[] {
	const raw = localStorage.getItem(KEY)
		return raw ? JSON.parse(raw) : []
	}

export function isBookmarked(id: string): boolean {
	return getBookmarks().some((b) => b.id === id)
}

export function toggleBookmark(id: string) {
	const current = getBookmarks()

	const exists = current.find((bookmark) => bookmark.id === id)

	let updated: BookmarkItem[]

	if (exists) {
		updated = current.filter((bookmark) => bookmark.id !== id)
	} else {
		updated = [
			...current,
			{ id, savedAt: Date.now() },
		]
	}

	localStorage.setItem(KEY, JSON.stringify(updated))
}