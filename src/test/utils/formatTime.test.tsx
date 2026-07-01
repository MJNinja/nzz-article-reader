import { describe, expect, it } from "vitest"
import { formatTime } from "@/utils/formatTime"

describe("formatTime", () => {
	const now = new Date("2026-07-01T12:00:00Z")

	it("shows minutes when under one hour", () => {
		const date = "2026-07-01T11:45:00Z"

		expect(formatTime(date, now)).toBe("15m ago")
	})

	it("shows hours when under one day", () => {
		const date = "2026-07-01T09:00:00Z"

		expect(formatTime(date, now)).toBe("3h ago")
	})

	it("shows the formatted date after 24 hours", () => {
		const date = "2026-06-29T12:00:00Z"

		expect(formatTime(date, now)).toBe(
			new Date(date).toLocaleDateString()
		)
	})
})