import { FC, memo } from "react"

type Props = {
  messages: string[]
}

export const ValidationErrorMessages: FC<Props> = memo(function ValidationErrorMessages({
  messages,
}: Props) {
  return (
    <>
      {messages.map((message, i) => (
        <p key={i} className='text-red-400'>
          {message}
        </p>
      ))}
    </>
  )
})
