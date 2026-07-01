import { screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { MemoryRouter } from "react-router"
import { ArticleCard } from "@/components/ArticleCard"
import { renderWithProviders } from "@/test/test-utils"
import type { Article } from "@/api/mockApi"

const mockArticle: Article = {
	id: "1",
	title: "Breaking News",
	lead: "This is the lead text",
	body: "Full article body",
	author: "John Doe",
	publishedAt: "2026-07-01T10:00:00Z",
	imageUrl: "https://picsum.photos/seed/1000/720/300.webp",
	premium: true,
	topics: [
		{ id: "politics", name: "Politics" },
		{ id: "sport", name: "Sport" },
	],
}

describe("ArticleCard", () => {
	it("renders article content correctly", () => {
		renderWithProviders(
			<MemoryRouter>
				<ArticleCard article={mockArticle} />
			</MemoryRouter>
		)

		// title
		expect(screen.getByText("Breaking News")).toBeInTheDocument()

		// lead
		expect(screen.getByText("This is the lead text")).toBeInTheDocument()

		// author
		expect(screen.getByText("John Doe")).toBeInTheDocument()

		// premium badge
		expect(screen.getByText("Premium")).toBeInTheDocument()

		// topics
		expect(screen.getByText("Politics")).toBeInTheDocument()
		expect(screen.getByText("Sport")).toBeInTheDocument()

		// image exists
		const img = screen.getByRole("img")
		expect(img).toBeInTheDocument()
		expect(img).toHaveAttribute("src", mockArticle.imageUrl)
	})
})