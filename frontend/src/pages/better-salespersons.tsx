import { useEffect } from 'react';

import { useQuery } from '@apollo/client';

import { Layout } from '@/components/ui/Layout';
import { GET_BETTER_SALESPERSONS } from '@/queries/salesperson';
import { Data, TopSalespersons } from '@/type';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BetterSalespersonsPage = () => {

  const { data, loading, error, startPolling, stopPolling } = useQuery<Data>(GET_BETTER_SALESPERSONS);

  useEffect(() => {

    startPolling(1000)
    return () => {
      stopPolling()
    }
  }, [startPolling, stopPolling]);


  if (loading) return 'Loading...'
  if (!data) return 'Something is wrong';

  const { getBetterSalespersons } = data;

  const salesGraph: TopSalespersons[] = [];

  getBetterSalespersons?.map((salesperson, idx) => {
    salesGraph[idx] = {
      ...salesperson.salesperson[0],
      total: salesperson.total
    }
  })

  return (
    <Layout title='Better Salespersons'>
      <ResponsiveContainer width='100%' height='50%'>
        <BarChart
          className='mt-2'
          data={salesGraph}
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
};

export default BetterSalespersonsPage;