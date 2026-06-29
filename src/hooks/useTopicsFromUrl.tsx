import { useSearchParams } from "react-router"

export function useTopicsFromUrl() {
  const [params, setParams] = useSearchParams()

  const topics = params.get("topics")

  const topicList = topics ? topics.split(",") : []

  function setTopics(newTopics: string[]) {
    if (newTopics.length === 0) {
      params.delete("topics")
    } else {
      params.set("topics", newTopics.join(","))
    }

    setParams(params)
  }

  return { topicList, setTopics }
}
