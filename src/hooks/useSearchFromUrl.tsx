import { useSearchParams } from "react-router"

export function useSearchFromUrl() {
	const [searchParams, setSearchParams] = useSearchParams()

	const query = searchParams.get("q") ?? ""

	function setQuery(value: string) {
		const params = new URLSearchParams(searchParams)

		if (value.trim()) {
			params.set("q", value)
		} else {
			params.delete("q")
		}

		setSearchParams(params)
	}

	return {
		query,
		setQuery,
	}
}