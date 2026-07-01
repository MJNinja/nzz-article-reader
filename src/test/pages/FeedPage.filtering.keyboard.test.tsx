import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { renderWithProviders } from "@/test/test-utils"
import { MemoryRouter } from "react-router"
import FeedPage from "@/pages/FeedPage"

describe("FeedPage - keyboard navigation", () => {
	it("moves focus through filter buttons in logical order", async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<MemoryRouter initialEntries={["/"]}>
				<FeedPage />
			</MemoryRouter>
		)

		// wait for real UI (not skeletons)
		await screen.findByText(/articles/i)

		// get ALL filter buttons
		const filterButtons = screen.getAllByRole("button")

		// first few buttons are filters
		const filters = filterButtons.slice(0, 8)

		// focus first element explicitly
		filters[0].focus()
		expect(filters[0]).toHaveFocus()

		// tab through UI
		await user.tab()
		expect(filters[1]).toHaveFocus()

		await user.tab()
		expect(filters[2]).toHaveFocus()

		await user.tab()
		expect(filters[3]).toHaveFocus()
	})
})