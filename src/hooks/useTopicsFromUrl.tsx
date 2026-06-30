import { useSearchParams } from "react-router"

export function useTopicsFromUrl() {
  const [params, setParams] = useSearchParams()

  const topics = params.get("topics")

  const topicList = topics ? topics.split(",") : []

  function setTopics(newTopics: string[]) {
	const normalized = newTopics.map((t) => t.toLowerCase())

    if (normalized.length === 0) {
      params.delete("topics")
    } else {
      params.set("topics", normalized.join(","))
    }

    setParams(params, { replace: true })
  }

  return { topicList, setTopics }
}
