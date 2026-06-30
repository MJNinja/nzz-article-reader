import { useBookmarkedArticles } from "@/features/bookmarks/useBookmarkedArticles"
import { ArticleCard } from "@/components/ArticleCard"

function BookmarksPage() {
	const { data, isLoading, isError } =
		useBookmarkedArticles()

	if (isLoading) {
		return (
		<div className="p-6">Loading bookmarks...</div>
		)
	}

	if (isError) {
		return (
		<div className="p-6 text-red-500">
			Failed to load bookmarks
		</div>
		)
	}

	if (!data || data.length === 0) {
		return (
		<div className="p-6 text-gray-500">
			No bookmarks yet
		</div>
		)
	}

	return (
		<div className="max-w-2xl mx-auto p-4">

		<h1 className="text-2xl font-bold mb-4">
			Bookmarks
		</h1>

		<div className="space-y-4">
			{data.map((article) => (
				<ArticleCard
					key={article.id}
					article={article}
				/>
			))}
		</div>

		</div>
	)
}

export default BookmarksPage