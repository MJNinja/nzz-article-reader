import { useQueryClient } from "@tanstack/react-query"
import { fetchArticle } from "@/api/mockApi"

export function usePrefetchArticle() {
	const queryClient = useQueryClient()

	function prefetchArticle(id: string) {
		const cached = queryClient.getQueryData(["article", id])

		if (cached) return

		queryClient.prefetchQuery({
			queryKey: ["article", id],
			queryFn: () => fetchArticle(id),
			staleTime: 1000 * 60 * 5, // 5 minutes cache
		})
	}

	return { prefetchArticle }
}