import { useRouter } from 'next/router';
import Link from 'next/link';

import { useQuery } from '@apollo/client';
import client from '@/config/apollo';

import { Layout, TableCustomerProducts } from '@/components/ui';
import { Customer } from '@/components/models';
import { GET_COSTUMERS_BY_SALESPERSON } from '@/queries';
import { Data } from '@/type';

const HomePage = () => {

  const router = useRouter();

  //Query 
  const { data, loading, error } = useQuery<Data>(GET_COSTUMERS_BY_SALESPERSON);

  if (loading) return 'Loading...'

  if (!data?.getCustomerBySalesperson) {
    client.clearStore()
    router.push('/login')
    return
  };

  return (
    <div>
      <Layout title='Customers'>
        <Link href='/new-customer' legacyBehavior >
          <a
            className='bg-green-600 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-green-800 mb-3 uppercase font-bold w-full lg:w-auto text-center'
            href=''
          >
            New Customer
          </a>
        </Link>
        <TableCustomerProducts
          title2='Company'
          title3='Email'
        >

          {data?.getCustomerBySalesperson.map(customer => (
            <Customer key={customer.id} customer={customer} />
          ))}
          
        </TableCustomerProducts>
      </Layout>
    </div>
  )
}

export default HomePage;
