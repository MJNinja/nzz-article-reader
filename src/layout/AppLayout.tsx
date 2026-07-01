import { Outlet } from "react-router"
import { Navigation } from "@/layout/Navigation"
import type { ReactNode } from "react"

type AppLayoutProps = {
	children?: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<div>
			<a
				href="#main"
				onClick={(e) => {
					e.preventDefault()
					document.getElementById("main")?.focus()
				}}
				className="absolute left-[-999px] top-auto focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:left-4 focus:top-4 bg-white border p-2"
			>
				Skip to content
			</a>

			<Navigation />

			<main id="main" tabIndex={-1}>
				{children ?? <Outlet />}
			</main>
		</div>
	)
}