import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { OrdersContext } from '@/context/orders';
import { IProduct } from '@/type';


interface Props {
  product: IProduct
}

export const ResumeProduct = ({ product }: Props) => {

  const [quantity, setQuantity] = useState(0);

  const { quantityProducts, updateTotal } = useContext(OrdersContext);

  const currentQuantity = () => {
    const newProduct = { ...product, quantity }
    quantityProducts(newProduct);

  }

  useEffect(() => {
    currentQuantity();
    updateTotal()
  }, [quantity]);

  const onQuantityChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQuantity(Number(e.target.value))
  }

  return (
    <div className='md:flex md:justify-between md:items-center mt-5 text-sm text-gray-800'>
      <div className='md:w-2/4 mb-2 md:mb-0' >
        <p className='text-sm' >{product.name}</p>
        <p>{product.price}</p>

      </div>
      <input
        className='bg-gray-50 hover:cursor-pointer py-2 px-3 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4'
        type='number'
        placeholder='Quantity'
        onChange={onQuantityChange}
        value={quantity}
      />
    </div>
  )
}
