import { renderHook, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useSearch } from "@/features/search/useSearch"
import type { Article } from "@/api/mockApi"
import { fetchFeed } from "@/api/mockApi"

vi.mock("@/api/mockApi", () => ({
	fetchFeed: vi.fn(),
}))

const mockFetchFeed = vi.mocked(fetchFeed)

const mockArticles: Article[] = [
	{
		id: "1",
		title: "Older Article",
		lead: "Lead",
		body: "Body",
		author: "Author",
		publishedAt: "2026-01-01T10:00:00Z",
		imageUrl: "https://picsum.photos/seed/1/600/300",
		premium: false,
		topics: [{ id: "sport", name: "Sport" }],
	},
	{
		id: "2",
		title: "Newer Article",
		lead: "Lead",
		body: "Body",
		author: "Author",
		publishedAt: "2026-01-03T10:00:00Z",
		imageUrl: "https://picsum.photos/seed/2/600/300",
		premium: false,
		topics: [{ id: "sport", name: "Sport" }],
	},
	{
		id: "3",
		title: "Middle Article",
		lead: "Lead",
		body: "Body",
		author: "Author",
		publishedAt: "2026-01-02T10:00:00Z",
		imageUrl: "https://picsum.photos/seed/3/600/300",
		premium: false,
		topics: [{ id: "sport", name: "Sport" }],
	},
]

function createWrapper() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	})

	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}

describe("useSearch", () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it("does not call API when query is empty", async () => {
		const { result } = renderHook(() => useSearch(""), {
			wrapper: createWrapper(),
		})

		expect(result.current.data).toBeUndefined()
		expect(mockFetchFeed).not.toHaveBeenCalled()
	})

	it("calls fetchFeed with query", async () => {
		mockFetchFeed.mockResolvedValue({
			data: mockArticles,
			meta: { nextPage: null, total: 3 },
		})

		renderHook(() => useSearch("climate"), {
			wrapper: createWrapper(),
		})

		expect(mockFetchFeed).toHaveBeenCalledWith({
			q: "climate",
		})
	})

	it("returns sorted results (newest first)", async () => {
		mockFetchFeed.mockResolvedValue({
			data: mockArticles,
			meta: { nextPage: null, total: 3 },
		})

		const { result } = renderHook(() => useSearch("news"), {
			wrapper: createWrapper(),
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true)
		})

		expect(result.current.data?.[0].title).toBe("Newer Article")
		expect(result.current.data?.[1].title).toBe("Middle Article")
		expect(result.current.data?.[2].title).toBe("Older Article")
	})

	it("trims whitespace in query", async () => {
		mockFetchFeed.mockResolvedValue({
			data: mockArticles,
			meta: { nextPage: null, total: 3 },
		})

		renderHook(() => useSearch("  sport  "), {
			wrapper: createWrapper(),
		})

		expect(mockFetchFeed).toHaveBeenCalledWith({
			q: "sport",
		})
	})
})