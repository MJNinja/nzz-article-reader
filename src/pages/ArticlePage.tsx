import { useState } from "react"
import { useParams, Link } from "react-router"
import { useArticle } from "@/features/article/useArticle"
import { isBookmarked, toggleBookmark } from "@/features/bookmarks/bookmarkStore"

function ArticlePage() {
	const { id } = useParams()

	const { data, isLoading, isError } = useArticle(id!)
	const article = data;

	const [bookmarked, setBookmarked] = useState(() =>
		id ? isBookmarked(id) : false
	)

	if (isLoading) {
		return <div className="p-6">Loading article...</div>
	}

	if (isError || !article) {
		return <div className="p-6 text-red-500">Article not found</div>
	}

	function handleBookmark() {
		if (!article) return
		
		toggleBookmark(article.id)
		setBookmarked(isBookmarked(article.id))
	}

	async function handleShare() {
		await navigator.clipboard.writeText(window.location.href)
		alert("Link copied")
	}

	return (
		<div className="max-w-2xl mx-auto p-4">

		{/* BACK */}
		<Link to="/" className="text-sm text-blue-600">
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
			className="border px-3 py-1 rounded transition hover:bg-gray-100 cursor-pointer"
			>
				{bookmarked ? "Remove Bookmark" : "Bookmark"}
			</button>

			<button
			onClick={handleShare}
			className="border px-3 py-1 rounded transition hover:bg-gray-100 cursor-pointer"
			>
				Share
			</button>
		</div>

		</div>
	)
}

export default ArticlePage