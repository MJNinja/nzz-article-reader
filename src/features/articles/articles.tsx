import { fetchFeed } from "@/api/mockApi";

export function getArticles(page: number, topics: string[]) {
  return fetchFeed({
    page,
    topics: topics.length ? topics : undefined,
  })
}