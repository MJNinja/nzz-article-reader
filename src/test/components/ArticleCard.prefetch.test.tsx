import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { ArticleCard } from "@/components/ArticleCard"
import type { Article } from "@/api/mockApi"
import { renderWithProviders } from "@/test/test-utils"
import { MemoryRouter } from "react-router"

const prefetchMock = vi.fn()

vi.mock("@/features/articles/usePrefetchArticle", () => ({
	usePrefetchArticle: () => ({
		prefetchArticle: prefetchMock,
	}),
}))

const article: Article = {
	id: "1",
	title: "Test Article",
	lead: "Test Lead",
	body: "Test Body",
	author: "Test Author",
	publishedAt: "2026-07-01T10:00:00Z",
	imageUrl: "https://picsum.photos/seed/4000/600/300",
	premium: false,
	topics: [{ id: "sport", name: "Sport" }],
}

describe("ArticleCard - prefetch behavior", () => {
	beforeEach(() => {
		prefetchMock.mockClear()
	})

	it("triggers prefetch on hover", async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<MemoryRouter>
				<ArticleCard article={article} />
			</MemoryRouter>
		)

		const link = screen.getByRole("link")

		await user.hover(link)

		expect(prefetchMock).toHaveBeenCalledTimes(1)
		expect(prefetchMock).toHaveBeenCalledWith("1")
	})

	it("triggers prefetch on focus (keyboard accessibility)", async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<MemoryRouter>
				<ArticleCard article={article} />
			</MemoryRouter>
		)

		const link = screen.getByRole("link")

		await user.tab()
		expect(link).toHaveFocus()

		expect(prefetchMock).toHaveBeenCalledTimes(1)
		expect(prefetchMock).toHaveBeenCalledWith("1")
	})
})