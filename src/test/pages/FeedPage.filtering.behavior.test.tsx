import { screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { MemoryRouter } from "react-router"
import { renderWithProviders } from "@/test/test-utils"
import FeedPage from "@/pages/FeedPage"
import { useLocation } from "react-router"

// Mock state per topic
function getArticlesForTopic(topic: string | null) {
	if (topic === "sport") {
		return [
			{
				id: "1",
				title: "Sport Article 1",
				lead: "Lead",
				body: "Body",
				author: "Author",
				publishedAt: "2026-07-01T10:00:00Z",
				imageUrl: "https://picsum.photos/seed/2001/720/300.webp",
				premium: false,
				topics: [{ id: "sport", name: "Sport" }],
			},
		]
	}

	return [
		{
			id: "2",
			title: "Default Article 1",
			lead: "Lead",
			body: "Body",
			author: "Author",
			publishedAt: "2026-07-01T10:00:00Z",
			imageUrl: "https://picsum.photos/seed/2002/720/300.webp",
			premium: false,
			topics: [{ id: "politics", name: "Politics" }],
		},
	]
}

// Mock useFeed
vi.mock("@/features/feed/useFeed", () => ({
	useFeed: (topics: string[]) => {
		const activeTopic = topics?.[0] ?? null

		return {
			articles: getArticlesForTopic(activeTopic),
			hasMore: false,
			loadMore: vi.fn(),
			isLoading: false,
			isLoadingMore: false,
			isError: false,
			retry: vi.fn(),
		}
	},
}))

function LocationDisplay() {
	const location = useLocation()
	return <div data-testid="location">{location.search}</div>
}

describe("FeedPage - filtering behavior", () => {
	it("updates feed content when topic changes", () => {
		renderWithProviders(
			<MemoryRouter initialEntries={["/"]}>
				<FeedPage />
				<LocationDisplay />
			</MemoryRouter>
		)

		expect(screen.getByText("Default Article 1")).toBeInTheDocument()

		// click sport filter
		const sportButton = screen.getByRole("button", { name: /sport/i })
		fireEvent.click(sportButton)

		// now sport article should appear
		expect(screen.getByText("Sport Article 1")).toBeInTheDocument()

		// and default article should be gone
		expect(
			screen.queryByText("Default Article 1")
		).not.toBeInTheDocument()
	})
})