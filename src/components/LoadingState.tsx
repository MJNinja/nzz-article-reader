type Props = {
  text: string
}

function LoadingState({ text }: Props) {
  return (
	<div role="status" aria-live="polite" className="text-gray-500 p-6">
		{text}
	</div>
  )
}

export default LoadingState