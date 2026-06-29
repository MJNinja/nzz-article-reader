import { useQuery } from "@tanstack/react-query"
import { getArticles } from "@/api/articles"

export function useArticles(page: number, topics: string[]) {
  return useQuery({
    queryKey: ["articles", page, topics],
    queryFn: () => getArticles(page, topics),
  })
}