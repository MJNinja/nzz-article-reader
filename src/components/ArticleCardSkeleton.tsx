import { Skeleton } from "@/components/ui/skeleton"

export function ArticleCardSkeleton() {
	return (
		<div className="space-y-3 border rounded-lg p-4" role="article">
			<Skeleton className="h-48 w-full rounded mb-3" aria-hidden="true" />

			<Skeleton className="h-6 w-3/4" aria-hidden="true" />

			<Skeleton className="h-4 w-full" aria-hidden="true" />
			<Skeleton className="h-4 w-2/3" aria-hidden="true" />

			<Skeleton className="h-3 w-24" aria-hidden="true" />
		</div >
	)
}