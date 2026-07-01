import { screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { ArticleCard } from "@/components/ArticleCard"
import type { Article } from "@/api/mockApi"
import { renderWithProviders } from "@/test/test-utils"
import { MemoryRouter } from "react-router"

vi.mock("@/features/bookmarks/bookmarkStore", () => ({
	isBookmarked: vi.fn(),
}))

import { isBookmarked } from "@/features/bookmarks/bookmarkStore"

const mockArticle: Article = {
	id: "1",
	title: "Test Article",
	lead: "Test Lead",
	body: "Test Body",
	author: "Test Author",
	publishedAt: "2026-07-01T10:00:00Z",
	imageUrl: "https://picsum.photos/seed/3000/600/300",
	premium: false,
	topics: [{ id: "sport", name: "Sport" }],
}

describe("ArticleCard - bookmark indicator", () => {
	it("shows bookmark badge when article is bookmarked", () => {
		;(isBookmarked as any).mockReturnValue(true)

		renderWithProviders(
			<MemoryRouter>
				<ArticleCard article={mockArticle} />
			</MemoryRouter>
		)

		expect(screen.getByText(/bookmarked/i)).toBeInTheDocument()
	})

	it("does NOT show bookmark badge when article is not bookmarked", () => {
		;(isBookmarked as any).mockReturnValue(false)

		renderWithProviders(
			<MemoryRouter>
				<ArticleCard article={mockArticle} />
			</MemoryRouter>
		)

		expect(screen.queryByText(/bookmarked/i)).not.toBeInTheDocument()
	})
})