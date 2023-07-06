
import Link from 'next/link';
import { useQuery } from '@apollo/client';

import { Layout, TableCustomerProducts } from '@/components/ui';
import { Product } from '@/components/models';
import { GET_PRODUCTS } from '@/queries/product';
import { Data } from '@/type';

const ProductsPage = () => {

  const { data, loading, error } = useQuery<Data>(GET_PRODUCTS);

  if (loading) return 'Loading...';

  if (!data) return 'Something is wrong';

  return (
    <Layout title='Products' >

      <Link href='/new-product' legacyBehavior >
        <a
          className='bg-green-600 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-green-800 mb-3 uppercase font-bold'
          href=''
        >
          New Product
        </a>
      </Link>

      <TableCustomerProducts
        title2='Price'
        title3='Stock'
      >
        
        {data.getProducts.map(product => (
          <Product key={product.id} product={product} />
        ))}

      </TableCustomerProducts>
    </Layout>
  )
}

export default ProductsPage;