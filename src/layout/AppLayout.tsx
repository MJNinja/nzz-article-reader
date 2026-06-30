import { Outlet } from "react-router"
import { Navigation } from "./Navigation"

export function AppLayout() {
	return (
		<div>
			<Navigation />

			<main>
				<Outlet />
			</main>
		</div>
	)
}