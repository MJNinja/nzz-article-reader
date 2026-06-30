import { NavLink } from "react-router"

export function Navigation() {
	const base = "px-3 py-2 text-sm rounded transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

	const active = "bg-primary text-primary-foreground"

	const inactive = "text-muted-foreground hover:bg-primary hover:text-muted"

	return (
		<nav className="border-b border-border bg-background">
			<div className="max-w-2xl mx-auto p-4 flex gap-2">

				<NavLink
				to="/"
				className={({ isActive }) =>
					`${base} ${isActive ? active : inactive}`
				}
				>
					Feed
				</NavLink>

				<NavLink
				to="/bookmarks"
				className={({ isActive }) =>
					`${base} ${isActive ? active : inactive}`
				}
				>
					Bookmarks
				</NavLink>

				<NavLink
				to="/search"
				className={({ isActive }) =>
					`${base} ${isActive ? active : inactive}`
				}
				>
					Search
				</NavLink>

			</div>
		</nav>
	)
}