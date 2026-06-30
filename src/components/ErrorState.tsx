type Props = {
  text: string
}

function ErrorState({ text }: Props) {
  return (
	<div role="alert" className="p-6 text-red-500">
		{text}
	</div>
  )
}

export default ErrorState