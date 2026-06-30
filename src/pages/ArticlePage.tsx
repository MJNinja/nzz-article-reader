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

	const pageTitle = article ? `${article.title} | NZZ Reader` : "Article | NZZ Reader"
	const pageDescription = article?.lead ?? "Read the latest article from NZZ Reader."

	return (
		<>
			<title>{pageTitle}</title>
			<meta name="description" content={pageDescription} />

			<div className="max-w-2xl mx-auto p-4">

				{/* BACK */}
				<Link to="/" className="text-sm text-blue-600 rounded-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2" aria-label="Go back to the homepage">
					← Back
				</Link>

				{/* TITLE */}
				<h1 className="text-3xl font-bold mt-4 text-foreground">
					{article.title}
				</h1>

				{/* META */}
				<p className="text-muted-foreground mt-2" aria-label={`Written by ${article.author}`}>
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
				<p className="text-lg mt-4 text-foreground" aria-describedby="article-body">
					{article.lead}
				</p>

				{/* BODY */}
				<div id="article-body" className="mt-6 whitespace-pre-line text-sm text-foreground" role="article body" aria-label="Article body content">
					{article.body}
				</div>

				{/* ACTIONS */}
				<div className="flex gap-3 mt-6" aria-label="Article actions">
					<button
						onClick={handleBookmark}
						className="border border-border px-3 py-1 rounded bg-background hover:bg-muted cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" aria-label="Bookmark article" aria-pressed={bookmarked ? "true" : "false"}
					>
						{bookmarked ? "Remove Bookmark" : "Bookmark"}
					</button>

					<button
						onClick={handleShare}
						className="border border-border px-3 py-1 rounded bg-background hover:bg-muted cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
						aria-label="Copy article link to clipboard"
					>
						Share
					</button>
				</div>

				{/* RELATED ARTICLES */}
				<div className="mt-10">
					<h2 id="related-articles" className="text-lg font-semibold mb-3 text-foreground">
						Related Articles
					</h2>
                    <p className="sr-only" aria-labelledby="related-articles">List of articles related to this topic.</p>

					{relatedLoading && (
						<div role="status" aria-live="polite" className="text-sm text-muted-foreground">
							Loading related articles...
						</div>
					)}

					{!relatedLoading && related?.length === 0 && (
						<div role="alert" className="text-sm text-muted-foreground">
							No related articles found.
						</div>
					)}

					<div className="space-y-3" role="list">
						{related?.map((article) => (
							<ArticleCard key={article.id} article={article} />
						))}
					</div>
				</div>

			</div>
		</>
	)
}

export default ArticlePage