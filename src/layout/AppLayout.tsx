import { Outlet } from "react-router"
import { Navigation } from "./Navigation"

export function AppLayout() {
	return (
		<div>
			<a
				href="#main"
				className="absolute left-[-999px] top-auto focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:left-4 focus:top-4 bg-white border p-2"
			>
				Skip to content
			</a>

			<Navigation />

			<main id="main">
				<Outlet />
			</main>
		</div>
	)
}