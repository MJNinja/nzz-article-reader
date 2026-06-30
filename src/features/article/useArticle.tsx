import { useQuery } from "@tanstack/react-query"
import { fetchArticle } from "@/api/mockApi"

export function useArticle(id: string) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
  })
}