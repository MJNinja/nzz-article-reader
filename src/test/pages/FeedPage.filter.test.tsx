import { screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { MemoryRouter } from "react-router"
import FeedPage from "@/pages/FeedPage"
import { useLocation } from "react-router"
import { renderWithProviders } from "@/test/test-utils"

function LocationDisplay() {
	const location = useLocation()
	return <div data-testid="location">{location.search}</div>
}

describe("FeedPage - topic filtering", () => {
	it("updates URL when a topic is selected", () => {
		
		renderWithProviders(
			<MemoryRouter initialEntries={["/"]}>
				<FeedPage />
				<LocationDisplay />
			</MemoryRouter>
		)

		const sportButton = screen.getByRole("button", { name: /sport/i })

		fireEvent.click(sportButton)

		expect(screen.getByTestId("location").textContent).toContain("topics=sport")
	})
})