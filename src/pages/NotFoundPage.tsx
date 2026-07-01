function NotFoundPage() {
	const pageTitle = "404 Page Not Found | NZZ Reader"
	const pageDescription = "The page you were looking for could not be found."

	return (
		<>
			<title>{pageTitle}</title>
    		<meta name="description" content={pageDescription} />

			<div className="max-w-2xl mx-auto p-4">
				
				<div>NotFoundPage</div>

			</div>
		</>
	)
}

export default NotFoundPage