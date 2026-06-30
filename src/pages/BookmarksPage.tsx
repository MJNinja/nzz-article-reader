import { Link } from "react-router"
import { useBookmarkedArticles } from "@/features/bookmarks/useBookmarkedArticles"

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
			<Link
				key={article.id}
				to={`/article/${article.id}`}
				className="block border rounded p-4 hover:bg-gray-50 transition"
			>
				<h2 className="font-semibold text-lg">
				{article.title}
				</h2>

				<p className="text-gray-600">
				{article.lead}
				</p>

				<p className="text-xs text-gray-400 mt-2">
				Saved{" "}
				{new Date(
					article.savedAt
				).toLocaleString()}
				</p>
			</Link>
			))}
		</div>

		</div>
	)
}

export default BookmarksPage