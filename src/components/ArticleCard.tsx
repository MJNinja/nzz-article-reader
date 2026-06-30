import { Link } from "react-router"
import type { Article } from "@/api/mockApi"
import { formatTime } from "@/utils/formatTime"

type Props = {
  article: Article
}

export function ArticleCard({ article }: Props) {
  return (
    <Link
      to={`/article/${article.id}`}
      className="block border rounded-lg p-4 hover:bg-gray-50 transition"
    >

      {/* IMAGE */}
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover rounded mb-3"
        />
      )}

      {/* PREMIUM BADGE */}
      {article.premium && (
        <span className="text-xs font-semibold bg-black text-white px-2 py-1 rounded inline-block mb-2">
          Premium
        </span>
      )}

      {/* TITLE */}
      <h2 className="text-xl font-semibold leading-snug">
        {article.title}
      </h2>

      {/* LEAD */}
      <p className="text-gray-600 mt-1">
        {article.lead}
      </p>

      {/* META */}
      <div className="text-sm text-gray-400 mt-2 flex gap-2 flex-wrap">
        <span>{article.author}</span>
        <span>•</span>
        <span>{formatTime(article.publishedAt)}</span>
      </div>

      {/* TOPICS */}
      <div className="flex flex-wrap gap-2 mt-3">
        {article.topics.map((topic) => (
          <span
            key={topic.id}
            className="text-xs bg-gray-100 px-2 py-1 rounded"
          >
            {topic.name}
          </span>
        ))}
      </div>

    </Link>
  )
}