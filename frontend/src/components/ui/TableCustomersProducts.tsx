import { ReactNode } from "react"

interface Props {
  children: ReactNode
  title2: string
  title3: string
}

export const TableCustomerProducts = ({children, title2, title3}:Props) => {
  return (
    <div className='overflow-x-scroll lg:overflow-x-hidden'>
    <table className='table-auto shadow-md mt-10 w-full w-lg' >
      <thead className='bg-gray-800' >
        <tr className='text-white' >
          <th className='w-1/5 py-2' >Name</th>
          <th className='w-1/5 py-2' >{title2}</th>
          <th className='w-1/5 py-2' >{title3}</th>
          <th className='w-1/5 py-2' >Edit</th>
          <th className='w-1/5 py-2' >Delete</th>
        </tr>
      </thead>

      <tbody className='bg-white' >
        {children}
      </tbody>
    </table>
  </div>
  )
}
