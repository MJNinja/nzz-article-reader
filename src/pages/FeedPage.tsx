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

	const {articles, hasMore, loadMore, isLoading, isFetching, isLoadingMore, isError, retry} = useFeed(topicList)

	function handleTopicToggle(topicId: string) {
		let updatedTopics = [...topicList]

		if (updatedTopics.includes(topicId)) {
			updatedTopics = updatedTopics.filter((t) => t !== topicId)
		} else {
			updatedTopics.push(topicId)
		}

		setTopics(updatedTopics)
	}

	return (
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
				className={`px-3 py-1 rounded border text-sm transition cursor-pointer ${
					active
					? "bg-black text-white"
					: "bg-white hover:bg-gray-100"
				}`}
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

		{/* SKELETON (initial OR topic change) */}
		{(isLoading) && (
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
				<ArticleCard key={article.id} article={article} />
			))}
			</div>
		)}

		{/* LOAD MORE */}
		{hasMore && (
			<div className="mt-8 flex justify-center">
			<Button onClick={() => loadMore()} disabled={isLoadingMore}>
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
	)
}

export default FeedPage