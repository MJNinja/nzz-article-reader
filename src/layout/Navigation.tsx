import { NavLink } from "react-router"

export function Navigation() {
	const base = "px-3 py-2 text-sm rounded transition focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"

	const active = "bg-black text-white"

	const inactive = "text-gray-600 hover:bg-gray-100"

	return (
		<nav className="border-b mb-6">
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