import { useState } from 'react';

interface Props {
  message:string | null
}

export const ShowMessage = ({message}:Props) => {


  return (
    <div className='bg-red-600 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto' >
      {message}
    </div>
  )
}