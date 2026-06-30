import { useEffect, useRef } from "react"
import { useFeed } from "@/features/feed/useFeed"
import { useTopicsFromUrl } from "@/hooks/useTopicsFromUrl"
import { ArticleCard } from "@/components/ArticleCard"
import { ArticleCardSkeleton } from "@/components/ArticleCardSkeleton"
import { Button } from "@/components/ui/button"

const ALL_TOPICS = [
	{ id: "politik", label: "Politik" },
	{ id: "wirtschaft", label: "Wirtschaft" },
	{ id: "feuilleton", label: "Feuilleton" },
	{ id: "sport", label: "Sport" },
	{ id: "wissenschaft", label: "Wissenschaft" },
	{ id: "meinung", label: "Meinung" },
	{ id: "international", label: "International" },
	{ id: "zuerich", label: "Zürich" },
]

function FeedPage() {
	const { topicList, setTopics } = useTopicsFromUrl()

	const {articles, hasMore, loadMore, isLoading, isLoadingMore, isError, retry} = useFeed(topicList)

	const articleRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

	const prevCount = useRef(0)

	const loadMoreTriggered = useRef(false)

	function handleTopicToggle(topicId: string) {
		let updatedTopics = [...topicList]

		if (updatedTopics.includes(topicId)) {
			updatedTopics = updatedTopics.filter((t) => t !== topicId)
		} else {
			updatedTopics.push(topicId)
		}

		setTopics(updatedTopics)
	}

	function handleLoadMore() {
		loadMoreTriggered.current = true
		prevCount.current = articles.length
		loadMore()
	}

	useEffect(() => {
		// only run if user clicked load more
		if (!loadMoreTriggered.current) return

		const previousLength = prevCount.current
		const currentLength = articles.length

		// wait until new batch actually arrives
		if (currentLength <= previousLength) return

		const firstNewArticle = articles[previousLength]

		if (!firstNewArticle) return

		const el = articleRefs.current[firstNewArticle.id]

		if (el) {
			requestAnimationFrame(() => {
				el.focus()
			})
		}

		// reset flag
		loadMoreTriggered.current = false
	}, [articles])

	const pageTitle = "NZZ Reader | Latest Articles"
	const pageDescription = "Browse the latest articles from NZZ including politics, sport, economy and more."

	return (
		<>
			<title>{pageTitle}</title>
    		<meta name="description" content={pageDescription} />

			<div className="max-w-2xl mx-auto p-4">

				<h1 className="text-3xl font-bold mb-6">
					Articles
				</h1>

				{/* TOPICS */}
				<div className="flex flex-wrap gap-2 mb-6">
					{ALL_TOPICS.map((topic) => {
					const active = topicList.includes(topic.id)

					return (
						<button
							key={topic.id}
							onClick={() => handleTopicToggle(topic.id)}
							className={`
								px-3 py-1 rounded border text-sm transition cursor-pointer
								focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
								${active ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"}
							`}
						>
							{topic.label}
						</button>
					)
					})}
				</div>

				{/* ERROR */}
				{isError && (
					<div className="border rounded p-4 bg-red-50 mb-6">
					<p className="text-red-600 mb-3">
						Failed to load articles.
					</p>
					<Button onClick={() => retry()}>Retry</Button>
					</div>
				)}

				{/* SKELETON */}
				{isLoading && (
					<div className="space-y-4">
					{Array.from({ length: 5 }).map((_, i) => (
						<ArticleCardSkeleton key={i} />
					))}
					</div>
				)}

				{/* ARTICLES */}
				{!isLoading && (
					<div className="space-y-4">
					{articles.map((article) => (
						<ArticleCard
							key={article.id}
							article={article}
							ref={(el) => {
								articleRefs.current[article.id] = el
							}}
						/>
					))}
					</div>
				)}

				{/* LOAD MORE */}
				{hasMore && (
					<div className="mt-8 flex justify-center">
						<Button onClick={handleLoadMore} disabled={isLoadingMore}>
							{isLoadingMore ? "Loading..." : "Load more"}
						</Button>
					</div>
				)}

				{/* EMPTY */}
				{!isLoading && articles.length === 0 && !isError && (
					<div className="text-center text-gray-500 mt-10">
						No articles found.
					</div>
				)}
			</div>
		</>
	)
}

export default FeedPage