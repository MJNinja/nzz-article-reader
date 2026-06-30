import { useQuery } from "@tanstack/react-query"
import { fetchArticle } from "@/api/mockApi"
import { getBookmarks } from "./bookmarkStore"

export function useBookmarkedArticles() {
	return useQuery({
		queryKey: ["bookmarks"],

		queryFn: async () => {
			const bookmarks = getBookmarks()

			const articles = await Promise.all(
				bookmarks.map(async (bookmark) => {
					const article = await fetchArticle(bookmark.id)

					return {
						...article,
						savedAt: bookmark.savedAt,
					}
				})
			)
			
			return articles.sort(
				(a, b) => b.savedAt - a.savedAt
			)
		},
	})
}