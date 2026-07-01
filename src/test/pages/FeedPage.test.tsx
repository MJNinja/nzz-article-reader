import React from "react"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { MemoryRouter } from "react-router"
import { renderWithProviders } from "@/test/test-utils"
import FeedPage from "@/pages/FeedPage"
import type { Article } from "@/api/mockApi"

const loadMoreMock = vi.fn()

const initialArticlesState: Article[] = [
	{
		id: "1",
		title: "Article 1",
		lead: "Lead 1",
		body: "Body 1",
		author: "Author 1",
		publishedAt: "2026-07-01T10:00:00Z",
		imageUrl: "https://picsum.photos/seed/1001/720/300.webp",
		premium: false,
		topics: [{ id: "sport", name: "Sport" }],
	},
	{
		id: "2",
		title: "Article 2",
		lead: "Lead 2",
		body: "Body 2",
		author: "Author 2",
		publishedAt: "2026-07-01T10:00:00Z",
		imageUrl: "https://picsum.photos/seed/1002/720/300.webp",
		premium: false,
		topics: [{ id: "politics", name: "Politics" }],
	},
]

let articlesState: typeof initialArticlesState

vi.mock("@/features/feed/useFeed", () => {
	return {
		useFeed: () => {
			const [state, setState] = React.useState(articlesState)

			return {
				articles: state,
				hasMore: true,
				loadMore: () => {
					const updated = [
						...articlesState,
						{
							id: "3",
							title: "Article 3",
							lead: "Lead 3",
							body: "Body 3",
							author: "Author 3",
							publishedAt: "2026-07-01T10:00:00Z",
							imageUrl: "https://picsum.photos/seed/1003/720/300.webp",
							premium: false,
							topics: [{ id: "sport", name: "Sport" }],
						},
						{
							id: "4",
							title: "Article 4",
							lead: "Lead 4",
							body: "Body 4",
							author: "Author 4",
							publishedAt: "2026-07-01T10:00:00Z",
							imageUrl: "https://picsum.photos/seed/1004/720/300.webp",
							premium: false,
							topics: [{ id: "politics", name: "Politics" }],
						},
					]
					articlesState = updated,
					setState(updated),
					loadMoreMock()
				},
				isLoading: false,
				isLoadingMore: false,
				isError: false,
				retry: vi.fn(),
			}
		},
	}
})

describe("FeedPage - load more focus behavior", () => {

	beforeEach(() => {
		// reset state before every test
		articlesState = [...initialArticlesState]
		loadMoreMock.mockReset()
	})

	it("focuses first newly loaded article after load more", async () => {
		renderWithProviders(
			<MemoryRouter>
				<FeedPage />
			</MemoryRouter>
		)

		const loadMoreBtn = screen.getByRole("button", { name: /load more/i })

		fireEvent.click(loadMoreBtn)

		// wait until new article exists
		const firstNew = await screen.findByText("Article 3")
		const link = firstNew.closest("a")

		// wait until focus actually moves to it
		await waitFor(() => {
			expect(document.activeElement).toBe(link)
		})
	})
})