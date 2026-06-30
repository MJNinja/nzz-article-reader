import { forwardRef } from "react"
import { Link } from "react-router"
import type { Article } from "@/api/mockApi"
import { usePrefetchArticle } from "@/features/articles/usePrefetchArticle"
import { formatTime } from "@/utils/formatTime"
import { isBookmarked } from "@/features/bookmarks/bookmarkStore"

type Props = {
  article: Article
}

export const ArticleCard = forwardRef<HTMLAnchorElement, Props>(
	({ article }, ref) => {
		
		const { prefetchArticle } = usePrefetchArticle()

		const bookmarked = isBookmarked(article.id)
		
		return (
			<article>
				<Link
				ref={ref}
                role="link"
				to={`/article/${article.id}`}
				onMouseEnter={() => prefetchArticle(article.id)}
				onFocus={() => prefetchArticle(article.id)}
				className="
					block border border-border rounded-lg p-4
					bg-card text-card-foreground
					hover:bg-muted transition
					focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
				"
				>

				{/* IMAGE */}
				{article.imageUrl && (
					<img
					src={article.imageUrl}
					alt={article.title}
					loading="lazy"
					className="w-full h-48 object-cover rounded mb-3"
					/>
				)}

				{/* BADGES */}
				<div className="flex gap-2 mb-2">
					{article.premium && (
						<span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded">
							Premium
						</span>
					)}

					{bookmarked && (
						<span className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-1 rounded">
							Bookmarked
						</span>
					)}
				</div >

				{/* TITLE */}
				<h2 className="text-xl font-semibold leading-snug">
					{article.title}
				</h2>

				{/* LEAD */}
				<p className="text-muted-foreground mt-1">
					{article.lead}
				</p>

				{/* META */}
				<div className="text-sm text-muted-foreground mt-2 flex gap-2 flex-wrap" aria-label="Article metadata">
					<span>{article.author}</span >
					<span>•</span >
					<time dateTime={article.publishedAt} aria-label={`Published on ${formatTime(article.publishedAt)}`}>
						{formatTime(article.publishedAt)}
					</time>
				</div>

				{/* TOPICS */}
                <div className="flex flex-wrap gap-2 mt-3" role="group" aria-labelledby="topics-heading">
                    <h3 id="topics-heading" className="sr-only">Topics</h3>
					{article.topics.map((topic) => (
						<span
							key={topic.id}
							className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
						>
							{topic.name}
						</span>
					))}
				</div >

				</Link>
			</article>
		)
	}
)

ArticleCard.displayName = "ArticleCard"