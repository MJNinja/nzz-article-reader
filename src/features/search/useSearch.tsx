import { useQuery } from "@tanstack/react-query"
import { fetchFeed } from "@/api/mockApi"

export function useSearch(query: string) {
	return useQuery({
		queryKey: ["search", query],

		queryFn: async () => {
			const result = await fetchFeed({
				q: query,
			})

			return result.data
		},

		enabled: query.trim().length > 0,
	})
}