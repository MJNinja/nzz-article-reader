import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import BookmarksPage from "@/pages/BookmarksPage"
import type { Article } from "@/api/mockApi"
import { renderWithProviders } from "@/test/test-utils"
import { MemoryRouter } from "react-router"
import * as bookmarkStore from "@/features/bookmarks/bookmarkStore"

const useBookmarkedArticlesMock = vi.fn()

vi.mock("@/features/bookmarks/useBookmarkedArticles", () => ({
	useBookmarkedArticles: () => useBookmarkedArticlesMock(),
}))

const mockArticles: Article[] = [
	{
		id: "1",
		title: "Saved Article One",
		lead: "Lead text",
		body: "Body",
		author: "Author",
		publishedAt: "2026-01-01T10:00:00Z",
		imageUrl: "https://picsum.photos/seed/6000/600/300",
		premium: false,
		topics: [{ id: "sport", name: "Sport" }],
	},
]

describe("BookmarksPage", () => {
	beforeEach(() => {
		useBookmarkedArticlesMock.mockClear()
		vi.restoreAllMocks()
	})

	it("shows loading state", () => {
		useBookmarkedArticlesMock.mockReturnValue({
			data: null,
			isLoading: true,
			isError: false,
		})

		render(<BookmarksPage />)

		expect(screen.getByText(/loading bookmarks/i)).toBeInTheDocument()
	})

	it("shows error state", () => {
		useBookmarkedArticlesMock.mockReturnValue({
			data: null,
			isLoading: false,
			isError: true,
		})

		render(<BookmarksPage />)

		expect(screen.getByText(/failed to load bookmarks/i)).toBeInTheDocument()
	})

	it("shows empty state when no bookmarks exist", () => {
		useBookmarkedArticlesMock.mockReturnValue({
			data: [],
			isLoading: false,
			isError: false,
		})

		render(<BookmarksPage />)

		expect(screen.getByText(/no bookmarks yet/i)).toBeInTheDocument()
	})

	it("renders bookmarked articles", () => {
		useBookmarkedArticlesMock.mockReturnValue({
			data: mockArticles,
			isLoading: false,
			isError: false,
		})

		renderWithProviders(
			<MemoryRouter>
				<BookmarksPage />
			</MemoryRouter>
		)

		expect(screen.getByText(/saved article one/i)).toBeInTheDocument()
	})

	it("renders correct number of bookmarked articles", () => {
		useBookmarkedArticlesMock.mockReturnValue({
			data: mockArticles,
			isLoading: false,
			isError: false,
		})

		renderWithProviders(
			<MemoryRouter>
				<BookmarksPage />
			</MemoryRouter>
		)

		const links = screen.getAllByRole("link")
		expect(links).toHaveLength(1)
	})

	it("renders ArticleCard structure (title + metadata)", () => {
		useBookmarkedArticlesMock.mockReturnValue({
			data: mockArticles,
			isLoading: false,
			isError: false,
		})

		renderWithProviders(
			<MemoryRouter>
				<BookmarksPage />
			</MemoryRouter>
		)

		expect(screen.getByText(/saved article one/i)).toBeInTheDocument()
		expect(screen.getByText(/author/i)).toBeInTheDocument()
		expect(screen.getByText(/sport/i)).toBeInTheDocument()
	})

	it("shows bookmarked badge when article is bookmarked", () => {
		// Force bookmark state
		vi.spyOn(bookmarkStore, "isBookmarked").mockReturnValue(true)

		useBookmarkedArticlesMock.mockReturnValue({
			data: mockArticles,
			isLoading: false,
			isError: false,
		})

		renderWithProviders(
			<MemoryRouter>
				<BookmarksPage />
			</MemoryRouter>
		)

		expect(screen.getByText(/bookmarked/i)).toBeInTheDocument()
	})
})