import { useState, useEffect, useContext } from 'react';

import { useQuery } from '@apollo/client';
import Select, { SingleValue } from 'react-select';

import { OrdersContext } from '@/context/orders';
import { GET_COSTUMERS_BY_SALESPERSON } from '@/queries';
import { Data, ICustomer } from '@/type';

export const AssignCustomer = () => {

  const [customer, setCustomer] = useState<SingleValue<ICustomer>>({} as ICustomer);
  const { addCustomer } = useContext(OrdersContext)

  const { data, loading, error } = useQuery<Data>(GET_COSTUMERS_BY_SALESPERSON);

  useEffect(() => {
    if (!customer || !addCustomer) return;
    addCustomer(customer)
  }, [customer, addCustomer]);

  if (loading) return null;
  if (!data) return "Something wrong";

  const { getCustomerBySalesperson } = data

  const selectCustomer = (customers: SingleValue<ICustomer>) => {
    setCustomer(customers)
  }

  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-x-gray-800 text-gray-700 text-sm font-bold' >1. Assign Customer</p>
      <Select
        options={getCustomerBySalesperson}
        onChange={option => selectCustomer(option)}
        getOptionValue={options => options.id!}
        getOptionLabel={options => `${options.name} ${options.lastName}`}
        placeholder='Select client'
        noOptionsMessage={() => 'There no are results'}
        className='text-gray-800 mt-3'
      />
    </>
  )
}
