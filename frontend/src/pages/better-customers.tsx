import { useEffect } from 'react';

import {  useQuery } from '@apollo/client';

import { Layout } from '@/components/ui/Layout';
import { GET_BETTER_CUSTOMERS } from '@/queries';
import { Data, TopCustomer } from '@/type';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BetterCustomersPage = () => {

  const { data, loading, error, startPolling, stopPolling } = useQuery<Data>(GET_BETTER_CUSTOMERS);

  useEffect(() => {

    startPolling(360000)
    return () => {
      stopPolling()
    }
  }, [startPolling, stopPolling]);

  if (loading) return 'Loading...'
  if (!data) return 'Something is wrong';

  const { getBetterCustomers } = data;

  const customerGraph: TopCustomer[] = [];

  getBetterCustomers?.map((customer, idx) => {
    customerGraph[idx] = {
      ...customer.customer[0],
      total: customer.total
    }
  })

  return (
    <Layout title='Better Customers'>

      <ResponsiveContainer width='100%' height='50%'>
        <BarChart
          className='mt-2'
          data={customerGraph}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='total' fill='#3182ce' />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  )
}

export default BetterCustomersPage