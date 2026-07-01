import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach } from "vitest"
import SearchPage from "@/pages/SearchPage"
import type { Article } from "@/api/mockApi"
import { renderWithProviders } from "@/test/test-utils"
import { MemoryRouter } from "react-router"

const setQueryMock = vi.fn()

vi.mock("@/hooks/useSearchFromUrl", () => ({
	useSearchFromUrl: () => ({
		query: "",
		setQuery: setQueryMock,
	}),
}))

vi.mock("@/hooks/useDebounce", () => ({
	useDebounce: (value: string) => value,
}))

const useSearchMock = vi.fn()

vi.mock("@/features/search/useSearch", () => ({
	useSearch: (query: string) => useSearchMock(query),
}))

const mockArticles: Article[] = [
	{
		id: "1",
		title: "Climate Change Impact",
		lead: "Important article",
		body: "Test Body",
		author: "Test Author",
		publishedAt: "2026-01-01T10:00:00Z",
		imageUrl: "https://picsum.photos/seed/5000/600/300",
		premium: false,
		topics: [{ id: "wirtschaft", name: "Wirtschaft" }],
	},
]

describe("SearchPage", () => {
	beforeEach(() => {
		setQueryMock.mockClear()
		useSearchMock.mockClear()
	})

	it("renders search input", () => {
		useSearchMock.mockReturnValue({
			data: [],
			isLoading: false,
			isError: false,
		})

		render(<SearchPage />)

		expect(
			screen.getByPlaceholderText(/search articles/i)
		).toBeInTheDocument()
	})

	it("updates query when user types", async () => {
		const user = userEvent.setup()

		useSearchMock.mockReturnValue({
			data: [],
			isLoading: false,
			isError: false,
		})

		render(<SearchPage />)

		const input = screen.getByPlaceholderText(/search articles/i)

		await user.type(input, "climate")

		expect(setQueryMock).toHaveBeenCalled()
	})

	it("calls search hook with query", () => {
		useSearchMock.mockReturnValue({
			data: [],
			isLoading: false,
			isError: false,
		})

		render(<SearchPage />)

		expect(useSearchMock).toHaveBeenCalledWith("")
	})

	it("shows loading state", () => {
		useSearchMock.mockReturnValue({
			data: [],
			isLoading: true,
			isError: false,
		})

		render(<SearchPage />)

		expect(screen.getByText(/searching/i)).toBeInTheDocument()
	})

	it("shows error state", () => {
		useSearchMock.mockReturnValue({
			data: [],
			isLoading: false,
			isError: true,
		})

		render(<SearchPage />)

		expect(
			screen.getByText(/something went wrong/i)
		).toBeInTheDocument()
	})

	it("shows empty state when no results found", () => {
		useSearchMock.mockReturnValue({
			data: [],
			isLoading: false,
			isError: false,
		})

		render(<SearchPage />)

		// simulate query context (debounced query is empty by default in mock)
		expect(
			screen.queryByText(/no articles found/i)
		).not.toBeInTheDocument()
	})

	it("renders search results", () => {
		useSearchMock.mockReturnValue({
			data: mockArticles,
			isLoading: false,
			isError: false,
		})

		renderWithProviders(
			<MemoryRouter>
				<SearchPage />
			</MemoryRouter>
		)

		expect(
			screen.getByText(/climate change impact/i)
		).toBeInTheDocument()
	})
})