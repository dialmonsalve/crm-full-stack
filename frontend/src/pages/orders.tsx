import Link from 'next/link';
import { useQuery } from '@apollo/client';

import { Layout } from '@/components/ui';
import { Order } from '@/components/models';
import { GET_ORDERS } from '@/queries';
import { Data } from '@/type';


const OrdersPage = () => {

  const { data, loading, error } = useQuery<Data>(GET_ORDERS);

  if (loading) return 'Loading...';

  if (!data) return 'Something is wrong';

  return (
    <Layout title="Orders">

      <Link href='/new-order' legacyBehavior >
        <a
          className="bg-green-600 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-green-800 mb-3 uppercase font-bold"
          href=""
        >
          New Order
        </a>
      </Link>

      <div>
        {data.getOrderBySalesperson?.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>

    </Layout>
  )
}

export default OrdersPage