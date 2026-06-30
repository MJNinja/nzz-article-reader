import React from 'react'

type Props = {
  text: string
}

function LoadingState({ text }: Props) {
  return (
	<>
		<div className="text-gray-500 p-6">{text}</div>
	</>
  )
}

export default LoadingState