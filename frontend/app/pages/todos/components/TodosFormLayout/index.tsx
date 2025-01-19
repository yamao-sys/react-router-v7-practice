import { FC, ReactNode } from "react"
import { TodosLayout } from "../../layout"

type Props = {
  header: string
  children: ReactNode
}

export const TodosFormLayout: FC<Props> = ({ header, children }: Props) => {
  return (
    <TodosLayout>
      <div className='p-4 md:p-16'>
        <div className='md:w-3/5 mx-auto'>
          <h3 className='mt-16 w-full text-center text-2xl font-bold'>{header}</h3>

          {children}
        </div>
      </div>
    </TodosLayout>
  )
}
