import { useState } from "react"
import { useArticles } from "@/hooks/useArticles"
import { useTopicsFromUrl } from "@/hooks/useTopicsFromUrl"
import { ArticleCard } from "@/components/ArticleCard"

function FeedPage() {
	const [page, setPage] = useState(0)
	
	const { topicList, setTopics } = useTopicsFromUrl()

	const { data, isLoading, error } = useArticles(page, topicList)

	//console.log(data);

	if (isLoading) return <div>Loading...</div>

	if (error) return <div>Error: {error.message}</div>
	//if (error) return <div>Something went wrong</div> // This the one AI supplied
	
	return (
	<div className="max-w-2xl mx-auto p-4">
		<h1 className="text-3xl font-bold mb-4">Articles</h1>

		{/* Topic filters (simple version for now) */}
		<div className="flex gap-2 mb-4">
		{["sport", "politik", "wirtschaft"].map((t) => {
			const active = topicList.includes(t)

			return (
			<button
				key={t}
				onClick={() => {
					if (active) {
						setTopics(topicList.filter((x) => x !== t))
					} else {
						setTopics([...topicList, t])
					}
					setPage(0)
				}}
				className={`px-3 py-1 border rounded hover:bg-black hover:text-white ${active ? "bg-black text-white" : ""}`}
			>
				{t}
			</button>
			)
		})}
		</div>

		{/* Articles */}
		<div className="space-y-4">
			{data?.data.map((article) => (
				<ArticleCard key={article.id} article={article} />
			))}
		</div>

		{/* Pagination */}
		<div className="mt-6 flex justify-center">
			{data?.meta.nextPage !== null && (
				<button
				onClick={() => setPage((p) => p + 1)}
				className="px-4 py-2 border rounded"
				>
					Load more
				</button>
			)}
		</div>
	</div>
	)
}

export default FeedPage


/*
Issues:
- Should show a list of all topics that can be searched for and not just this short list ["sport", "politik", "wirtschaft"].
- Load more not updating page URL with query params
- Load more should just show more articles below the existing ones
- Each card shows:
    Title
    Lead
    Hero image (if imageUrl)
    Author
    Relative publish time (e.g. 2h ago)
    Topic chips
    Premium badge (if premium: true)
*/