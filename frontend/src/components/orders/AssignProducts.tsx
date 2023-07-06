import { useState, useEffect, useContext } from 'react';

import { useQuery } from '@apollo/client';
import Select, { MultiValue } from 'react-select';

import { NewProduct, OrdersContext } from '@/context/orders';
import { GET_PRODUCTS } from '@/queries/product';
import { Data, IProduct } from '@/type';


export const AssignProducts = () => {

  const [products, setProducts] = useState<MultiValue<IProduct>>([]);
  const { addProducts } = useContext(OrdersContext)

  const { data, loading, error } = useQuery<Data>(GET_PRODUCTS);

  useEffect(() => {
    if (!products || !addProducts) return;
    addProducts(products as NewProduct[]);    
  }, [products]);

  if (loading) return null;
  if (!data) return 'Something wrong';

  const { getProducts } = data

  const selectProduct = (product: MultiValue<IProduct>) => {
    setProducts(product)
  }

  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-x-gray-800 text-gray-700 text-sm font-bold' >2. Assign or search products</p>
      <Select
        options={getProducts}
        isMulti
        onChange={option => selectProduct(option)}
        getOptionValue={options => options.id!}
        getOptionLabel={options => `${options.name} - ${options.stock} available now`}
        placeholder='Select products'
        noOptionsMessage={() => 'There no are results'}
        className='text-gray-800 mt-3'
      />
    </>
  )
}
