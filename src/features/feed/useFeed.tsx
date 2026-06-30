import { useInfiniteQuery } from "@tanstack/react-query"
import { getArticles } from "@/api/articles"
import type { Article } from "@/api/mockApi"

type FeedResponse = {
	data: Article[]
	meta: {
		nextPage: number | null
		total: number
	}
}

export function useFeed(topics: string[]) {
	const query = useInfiniteQuery<FeedResponse>({
		queryKey: ["feed", topics],

		queryFn: ({ pageParam = 0 }) => {
			return getArticles(pageParam as number, topics)
		},

		initialPageParam: 0,

		getNextPageParam: (lastPage) => {
			return lastPage.meta.nextPage
		},
	})

	let articles: Article[] = []
	if (query.data) {
		for (const page of query.data.pages) {
			for (const article of page.data) {
				articles.push(article)
			}
		}
	}

	return {
		articles,

		hasMore: query.hasNextPage === true,

		loadMore: query.fetchNextPage,

		isLoading: query.isLoading,

		isFetching: query.isFetching,

		isLoadingMore: query.isFetchingNextPage,

		isError: query.isError,

		retry: query.refetch,
	}
}