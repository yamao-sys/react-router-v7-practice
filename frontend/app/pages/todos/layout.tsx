import { useAuthContext } from "@/contexts/AuthContext"
import { FC, ReactNode } from "react"
import { Link } from "react-router"

type Props = {
  children: ReactNode
}

export const TodosLayout: FC<Props> = ({ children }: Props) => {
  const { userName } = useAuthContext()

  return (
    <div className='p-4 md:p-16'>
      <div className='md:w-4/5 mx-auto'>
        <div className='flex justify-between'>
          <h1 className='text-base md:text-3xl text-center'>
            <Link to='/todos'>Todo Lists</Link>
          </h1>
          <div className='flex items-end'>
            <div className='inline align-bottom text-xs md:text-sm'>{userName}さん</div>
            <Link to='/todos' className='inline ml-4 underline align-bottom text-xs md:text-sm'>
              Todo一覧
            </Link>
            <Link to='/todos/new' className='inline ml-4 underline align-bottom text-xs md:text-sm'>
              Todo作成
            </Link>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
