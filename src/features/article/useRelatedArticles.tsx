import { useQuery } from "@tanstack/react-query"
import { fetchFeed } from "@/api/mockApi"

export function useRelatedArticles(topics: string[], currentId: string) {
	return useQuery({
		queryKey: ["related-articles", topics],

		queryFn: async () => {
			const res = await fetchFeed({
				page: 0,
				topics,
			})

			// remove current article + limit results
			const filtered = res.data.filter(
				(article) => article.id !== currentId
			)

			return filtered.slice(0, 3)
		},

		enabled: topics.length > 0,
	})
}