import { useBookmarkedArticles } from "@/features/bookmarks/useBookmarkedArticles"
import { ArticleCard } from "@/components/ArticleCard"
import LoadingState from "@/components/LoadingState"
import ErrorState from "@/components/ErrorState"

function BookmarksPage() {
	const { data, isLoading, isError } =
		useBookmarkedArticles()

	if (isLoading) {
		return <LoadingState text="Loading bookmarks..." />
	}

	if (isError) {
		return <ErrorState text="Failed to load bookmarks" />
	}

	if (!data || data.length === 0) {
		return (
		<div className="p-6 text-gray-500">
			No bookmarks yet
		</div>
		)
	}

	const pageTitle = "Bookmarks | NZZ Reader"
	const pageDescription = "View all your bookmarked NZZ articles."

	return (
		<>
			<title>{pageTitle}</title>
    		<meta name="description" content={pageDescription} />
			
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
		</>
	)
}

export default BookmarksPage