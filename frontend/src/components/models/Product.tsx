import Router from 'next/router';
import { useMutation } from "@apollo/client";
import Swal from 'sweetalert2';

import { DELETE_PRODUCT, GET_PRODUCTS } from "@/queries/product";
import { Data, IProduct } from '@/type'

interface Props {
  product: IProduct
}

export const Product = ({ product }: Props) => {

  const { id, name, price, stock } = product;

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache) {

      const { getProducts } = cache.readQuery<Data>({
        query: GET_PRODUCTS
      }) || {}

      cache.evict({ broadcast: false });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: getProducts?.filter(currentProduct => currentProduct.id !== id)
        }
      })
    }
  })

  const confirmDeleteProduct = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3075d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'yes, delete it!'
    }).then(async (result) => {

      if (result.value) {
        try {

          const { data } = await deleteProduct({
            variables: { id }
          })


          Swal.fire(
            'Deleted!',
            data.deleteProduct,
            'success'
          )
        } catch (error) {
          console.log(error);
        }
      }
    })

  };

  const confirmEditProduct = () => {
    Router.push({
      pathname: `/edit-product/${id}`,
    })
  }

  return (
    <tr className="text-gray-800">
      <td className="border px-4 py-2" >{name}</td>
      <td className="border px-4 py-2 text-center" >${price} </td>
      <td className="border px-4 py-2 text-center" >{stock} </td>
      <td className="border px-4 py-2" >
        <button
          className='bg-blue-600 flex justify-center items-center py-2 px-4 w-2/3 mx-auto text-white rounded text-xs uppercase font-bold'
          onClick={confirmEditProduct}
        >
          Edit
        </button>
      </td>
      <td className="border px-4 py-2" >
        <button
          className='bg-red-600 flex justify-center items-center py-2 px-4 w-2/3 mx-auto text-white rounded text-xs uppercase font-bold'
          onClick={confirmDeleteProduct}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}
