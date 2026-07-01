import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { renderWithProviders } from "@/test/test-utils"
import { MemoryRouter } from "react-router"
import { AppLayout } from "@/layout/AppLayout"
import FeedPage from "@/pages/FeedPage"

describe("FeedPage - skip to content", () => {
	it("moves focus correctly when skip link is activated", async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<MemoryRouter>
				<AppLayout>
					<FeedPage />
				</AppLayout>
			</MemoryRouter>
		)

		const skipLink = await screen.findByRole("link", {
			name: /skip to content/i,
		})

		await user.click(skipLink)

		const main = document.querySelector("#main") as HTMLElement

		await waitFor(() => {
			expect(document.activeElement).toBe(main)
		})
	})
})