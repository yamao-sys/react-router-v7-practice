import { BaseFormBox } from "@/components/atoms/BaseFormBox"
import { ComponentProps, FC, memo } from "react"
import { ValidationErrorMessages } from "../ValidationErrorMessages"

type Props = {
  labelText: string
  labelId: string
  validationErrorMessages: string[]
  needsMargin: boolean
} & ComponentProps<"input">

export const BoxInputForm: FC<Props> = memo(function BoxInputForm({
  labelText,
  labelId,
  validationErrorMessages = [],
  needsMargin = true,
  type = "text",
  name,
  value,
  onChange,
}: Props) {
  return (
    <BaseFormBox needsMargin={needsMargin}>
      <label
        htmlFor={labelId}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left'
      >
        <span className='font-bold'>{labelText}</span>
      </label>
      <input
        id={labelId}
        name={name}
        type={type}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        value={value}
        onChange={onChange}
      />

      <ValidationErrorMessages messages={validationErrorMessages} />
    </BaseFormBox>
  )
})
