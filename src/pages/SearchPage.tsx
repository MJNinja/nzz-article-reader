import { useState } from "react"
import { useSearchFromUrl } from "@/hooks/useSearchFromUrl"
import { useDebounce } from "@/hooks/useDebounce"
import { useSearch } from "@/features/search/useSearch"
import { ArticleCard } from "@/components/ArticleCard"
import LoadingState from "@/components/LoadingState"
import ErrorState from "@/components/ErrorState"

function SearchPage() {
	const { query, setQuery } = useSearchFromUrl()

	const [inputValue, setInputValue] = useState(query)

	const debouncedQuery = useDebounce(inputValue, 300)

	function handleChange(value: string) {
		setInputValue(value)
		setQuery(value)
	}

	const {data: articles, isLoading, isError} = useSearch(debouncedQuery)

	const pageTitle = "Article Search | NZZ Reader"
	const pageDescription = "Search through the articles from NZZ."

	return (
		<>
			<title>{pageTitle}</title>
    		<meta name="description" content={pageDescription} />

			<div className="max-w-2xl mx-auto p-4">

				{/* TITLE */}
				<h1 className="text-2xl font-bold mb-4">
					Search Articles
				</h1>

				{/* INPUT */}
				<label className="sr-only" htmlFor="search">
					Search articles
				</label>
				<input
					id="search"
					value={inputValue}
					onChange={(e) => handleChange(e.target.value)}
					placeholder="Search articles..."
					className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
				/>

				{/* LOADING */}
				{isLoading && (
					<LoadingState text="Searching..." />
				)}

				{/* ERROR */}
				{isError && (
					<ErrorState text="Something went wrong." />
				)}

				{/* EMPTY STATE */}
				{!isLoading && !isError && debouncedQuery && articles?.length === 0 && (
					<div className="text-gray-500">
						No articles found for "{debouncedQuery}"
					</div>
				)}

				{/* RESULTS */}
				<div className="space-y-4">
					{articles?.map((article) => (
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

export default SearchPage