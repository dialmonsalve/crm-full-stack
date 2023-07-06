import { useContext } from 'react';

import { OrdersContext } from '@/context/orders';
import { ResumeProduct } from './ResumeProduct';


export const ResumeOrder = () => {

  const { products } = useContext(OrdersContext)

  return (
    <>

      <p className='mt-10 my-2 bg-white border-l-4 border-x-gray-800 text-gray-700 text-sm font-bold' >3. Resume Order</p>

      {
        products.length > 0
          ? (<>
            {products.map(product => (
              <ResumeProduct key={product.id} product={product} />
            ))}
          </>)
          : (<p className='mt-5 text-sm text-gray-800'>There is no orders already</p>)
      }
    </>
  )
}
