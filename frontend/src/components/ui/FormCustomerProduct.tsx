import { ReactNode } from 'react';

interface Props {
  typeForm: string
  create?: boolean | string
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
  children: ReactNode
}

export const FormCustomerProduct = ({ typeForm, children, create = true, handleSubmit, }: Props) => {
  return (
    <form onSubmit={handleSubmit} >

      {children}

      <input
        type='submit'
        className='bg-gray-600 w-full mt-5 p-2 text-white hover:bg-gray-700 hover:cursor-pointer uppercase'
        value={ create === 'Login' ? 'Login':  create ? `Create ${typeForm}` : `Edit ${typeForm}`}
      />
    </form>
  )
}
