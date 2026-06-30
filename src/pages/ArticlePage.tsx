import { useState } from "react"
import { useParams, Link } from "react-router"
import { ArticleCard } from "@/components/ArticleCard"
import { useArticle } from "@/features/articles/useArticle"
import { isBookmarked, toggleBookmark } from "@/features/bookmarks/bookmarkStore"
import { useRelatedArticles } from "@/features/articles/useRelatedArticles"
import LoadingState from "@/components/LoadingState"
import ErrorState from "@/components/ErrorState"

function ArticlePage() {
	const { id } = useParams()

	const { data, isLoading, isError } = useArticle(id!)
	const article = data;

	const [bookmarked, setBookmarked] = useState(() => id ? isBookmarked(id) : false)

	const topicIds = article?.topics.map((topic) => topic.id) ?? []

	const {data: related, isLoading: relatedLoading} = useRelatedArticles(topicIds, article?.id ?? "")

	if (isLoading) {
		return <LoadingState text="Loading article..." />
	}

	if (isError || !article) {
		return <ErrorState text="Article not found" />
	}

	function handleBookmark() {
		if (!article) return

		toggleBookmark(article.id)
		setBookmarked(isBookmarked(article.id))
	}

	async function handleShare() {
		await navigator.clipboard.writeText(window.location.href)
		alert("Link copied") // TODO: Make it into a nice looking popup or HTML dialog
	}

	return (
		<div className="max-w-2xl mx-auto p-4">

			{/* BACK */}
			<Link to="/" className="text-sm text-blue-600 rounded-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
				← Back
			</Link>

			{/* TITLE */}
			<h1 className="text-3xl font-bold mt-4">
				{article.title}
			</h1>

			{/* META */}
			<p className="text-gray-500 mt-2">
				{article.author}
			</p>

			{/* IMAGE */}
			{article.imageUrl && (
				<img
				src={article.imageUrl}
				fetchPriority="high"
				alt={article.title}
				className="w-full mt-4 rounded"
				/>
			)}

			{/* LEAD */}
			<p className="text-lg mt-4">
				{article.lead}
			</p>

			{/* BODY */}
			<div className="mt-6 whitespace-pre-line text-gray-800">
				{article.body}
			</div>

			{/* ACTIONS */}
			<div className="flex gap-3 mt-6">
				<button
				onClick={handleBookmark}
				className="border px-3 py-1 rounded transition hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
				>
					{bookmarked ? "Remove Bookmark" : "Bookmark"}
				</button>

				<button
				onClick={handleShare}
				className="border px-3 py-1 rounded transition hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
				>
					Share
				</button>
			</div>

			{/* RELATED ARTICLES */}
			<div className="mt-10">
				<h2 className="text-lg font-semibold mb-3">
					Related Articles
				</h2>

				{relatedLoading && (
					<div className="text-sm text-gray-500">
					Loading related articles...
					</div>
				)}

				{!relatedLoading && related?.length === 0 && (
					<div className="text-sm text-gray-500">
					No related articles found
					</div>
				)}

				<div className="space-y-3">
					{related?.map((article) => (
						<ArticleCard
							key={article.id}
							article={article}
						/>
					))}
				</div>
			</div>

		</div>
	)
}

export default ArticlePage