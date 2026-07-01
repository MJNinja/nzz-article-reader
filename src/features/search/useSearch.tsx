import { useQuery } from "@tanstack/react-query"
import { fetchFeed } from "@/api/mockApi"

export function useSearch(query: string) {
	const normalizedQuery = query.trim()

	return useQuery({
		queryKey: ["search", normalizedQuery],

		queryFn: async () => {
			const result = await fetchFeed({
				q: normalizedQuery,
			})

			return [...result.data].sort((a, b) =>
				new Date(b.publishedAt).getTime() -
				new Date(a.publishedAt).getTime()
			)
		},

		enabled: normalizedQuery.length > 0
	})
}