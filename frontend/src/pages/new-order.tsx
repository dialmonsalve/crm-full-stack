
import { useState } from 'react';
import { useContext } from 'react';

import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

import { Layout } from '@/components/ui/Layout';
import { AssignCustomer, AssignProducts, ResumeOrder, Total } from '@/components/orders';
import { OrdersContext } from '@/context/orders';
import { CREATE_ORDER, GET_ORDERS_BY_SALESPERSON } from '@/queries';
import { Data } from '@/type';
import { ShowMessage } from '@/components/helpers/ShowMessage';

const NewOrderPage = () => {

  const [message, setMessage] = useState<string | null>('');
  const router = useRouter();
  const { customer, total, products } = useContext(OrdersContext);

  const [createOrder, { loading }] = useMutation<Data>(CREATE_ORDER, {
    update(cache, { data }) {

      const { getOrderBySalesperson } = cache.readQuery<Data>({
        query: GET_ORDERS_BY_SALESPERSON
      }) ?? {};

      if (!getOrderBySalesperson) return;
      if (!data) return;

      cache.evict({ broadcast: false });

      cache.writeQuery({
        query: GET_ORDERS_BY_SALESPERSON,
        data: {
          getOrderBySalesperson: [...getOrderBySalesperson, data.createOrder]
        }
      })

    }
  });

  const validOrder = () => {
    return !products.every(product => product.quantity > 0) || total === 0 || customer.name === undefined ? 'opacity-50 cursor-not-allowed' : ''
  }

  const createNewOrder = async () => {
    // Remove info unnecessary from products
    const order = products.map(({ __typename, stock, createdAt, ...product }) => product)

    try {
      const { data } = await createOrder({
        variables: {
          input: {
            customer: customer?.id,
            total,
            order
          }
        }
      });

      Swal.fire(
        'Success!',
        'Order create correctly',
        'success'
      )

      router.push('/orders')
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }

      setTimeout(() => {
        setMessage(null)
      }, 3000);

    }
  }

  return (


    <Layout title='Create a new order' >
      {message && (<ShowMessage message={message} />) }

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>

          <AssignCustomer />
          <AssignProducts />
          <ResumeOrder />
          <Total />
          <button
            className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validOrder()} `}
            onClick={createNewOrder}
            disabled={!validOrder() ? false : true}
          >
            Register Order
          </button>
        </div>
      </div>

    </Layout>

  )
}

export default NewOrderPage