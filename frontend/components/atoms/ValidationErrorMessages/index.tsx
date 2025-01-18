import { FC, memo } from "react"

type Props = {
  messages: string[]
}

export const validationErrorMessages: FC<Props> = memo(function validationErrorMessages({
  messages,
}: Props) {
  return (
    <div className='w-full pt-5 text-left'>
      {messages.map((message, i) => (
        <p key={i} className='text-red-400'>
          {message}
        </p>
      ))}
    </div>
  )
})
