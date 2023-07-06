import Router from 'next/router';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

import { DELETE_CUSTOMER, GET_COSTUMERS_BY_SALESPERSON } from '@/queries';
import { Data, ICustomer } from '@/type';

interface Props {
  customer: ICustomer
}

export const Customer = ({ customer }: Props) => {

  const { id, name, company, email, lastName } = customer;

  const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
    update(cache) {

      const { getCustomerBySalesperson } = cache.readQuery<Data>({ query: GET_COSTUMERS_BY_SALESPERSON }) ?? {}

      cache.evict({ broadcast: false });

      cache.writeQuery({
        query: GET_COSTUMERS_BY_SALESPERSON,
        data: {
          getCustomerBySalesperson: getCustomerBySalesperson?.filter(currentCustomer => currentCustomer.id !== id)
        }
      })
    }
  });

  const confirmDeleteCustomer = () => {
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

          const { data } = await deleteCustomer({
            variables: { id }
          })


          Swal.fire(
            'Deleted!',
            data.deleteClient,
            'success'
          )
        } catch (error) {
          console.log(error);
        }
      }
    })

  };

  const confirmEditCustomer = () => {
    Router.push({
      pathname: `/edit-customer/${id}`,
    })
  }

  return (
    <tr className="text-gray-800">
      <td className="border px-4 py-2" >{name} {lastName} </td>
      <td className="border px-4 py-2" >{company} </td>
      <td className="border px-4 py-2" >{email} </td>
      <td className="border px-4 py-2" >
        <button
          className='bg-blue-600 flex justify-center items-center py-2 px-4 w-2/3 mx-auto text-white rounded text-xs uppercase font-bold'
          onClick={confirmEditCustomer}
        >
          Edit
        </button>
      </td>
      <td className="border px-4 py-2" >
        <button
          className='bg-red-600 flex justify-center items-center py-2 px-4 w-2/3 mx-auto text-white rounded text-xs uppercase font-bold'
          onClick={confirmDeleteCustomer}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}
