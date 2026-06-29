import { createBrowserRouter } from "react-router"
import FeedPage from "@/pages/FeedPage"
import ArticlePage from "@/pages/ArticlePage"
import SearchPage from "@/pages/SearchPage"
import BookmarksPage from "@/pages/BookmarksPage"
import NotFoundPage from "@/pages/NotFoundPage"

export const router = createBrowserRouter([
  { path: "/", element: <FeedPage /> },
  { path: "/article/:id", element: <ArticlePage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/bookmarks", element: <BookmarksPage /> },
  { path: "*", element: <NotFoundPage /> }
])