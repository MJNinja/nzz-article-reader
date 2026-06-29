import { Link } from "react-router"
import type { Article } from "@/api/mockApi"

type Props = {
  article: Article
}

export function ArticleCard({ article }: Props) {
  return (
    <Link
      to={`/article/${article.id}`}
      className="block border rounded-lg p-4 hover:bg-gray-50"
    >
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          className="w-full h-48 object-cover rounded"
        />
      )}

      <h2 className="text-xl font-semibold mt-2">
        {article.title}
      </h2>

      <p className="text-gray-600">{article.lead}</p>

      <p className="text-sm text-gray-400 mt-2">
        {article.author}
      </p>
    </Link>
  )
}