import { useCallback, useEffect, useState } from 'react';

import { useMutation } from "@apollo/client";
import Swal from 'sweetalert2';

import { DELETE_ORDER, GET_ORDERS_BY_SALESPERSON, UPDATE_ORDER } from "@/queries";
import { Data, IOrder, StatusOrderType } from "@/type"

interface Props {
  order: IOrder
}

export const Order = ({ order }: Props) => {

  const { id, customer, status, total } = order;
  const [updateOrder] = useMutation<Data>(UPDATE_ORDER);
  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { getOrderBySalesperson } = cache.readQuery<Data>({
        query: GET_ORDERS_BY_SALESPERSON
      }) || {};

      cache.evict({ broadcast: false });

      cache.writeQuery({
        query: GET_ORDERS_BY_SALESPERSON,
        data: {
          getOrderBySalesperson: getOrderBySalesperson?.filter(order => order.id !== id)
        }
      })
    }
  });

  const [statusOrder, setStatusOrder] = useState(status);
  const [defineClass, setDefineClass] = useState('');

  const classOrder = useCallback(() => {
    if (statusOrder === 'PENDING') {
      setDefineClass('border-yellow-500')

    } else if (statusOrder === 'COMPLETED') {
      setDefineClass('border-green-500')
    } else {
      setDefineClass('border-red-800')
    }
  }, [statusOrder])


  useEffect(() => {
    if (statusOrder) {
      setStatusOrder(statusOrder)
    }
    classOrder();
  }, [statusOrder, classOrder]);

  if (!customer) return 'Something wrong';

  const changeStatusValue = async (newStatus: StatusOrderType) => {

    try {
      const { data } = await updateOrder({
        variables: {
          id,
          input: {
            status: newStatus,
            customer: customer.id

          }
        }
      });

      if (!data) return 'something wrong'

      setStatusOrder(data.updateOrder.status)
    } catch (error) {
      console.log(error);
    }
  }

  const confirmDeleteOrder = () => {

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

          const { data } = await deleteOrder({
            variables: { id }
          })
          Swal.fire(
            'Deleted!',
            data.deleteOrder,
            'success'
          )
        } catch (error) {
          console.log(error);
        }
      }
    })

  }

  return (
    <div className={` ${defineClass} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`} >
      <div>
        <p className="font-bold text-gray-800" >Customer: {customer.name} {customer.lastName}</p>

        {
          customer.email && (
            <p className="text-gray-800" >{customer.email}</p>
          )
        }

        {
          customer.phone && (
            <p className="text-gray-800" >{customer.phone}</p>
          )
        }

        <h2 className="text-gray-800 font-bold mt-10">Order Status:</h2>

        <select
          className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
          defaultValue={statusOrder}
          onChange={e => changeStatusValue(e.target.value as StatusOrderType)}
        >
          <option value="COMPLETED">COMPLETED</option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELED">CANCELED</option>

        </select>
      </div>

      <div>
        <h2 className="text-gray-800 font-bold mt-2" >Order Resumen</h2>
        {order.order.map(article => (
          <div key={article.id} className="mt-4">
            <p className="text-sm text-gray-600">Product: {article.name}</p>
            <p className="text-sm text-gray-600">Quantity: {article.quantity}</p>
          </div>
        ))}
        <p className="text-gray-800 mt-3 font-bold">Total to pay:
          <span className="font-light text-gray-800 " > $ {total}</span>
        </p>

        <button
          className=" uppercase text-xs font-bold flex items-center mt-4 bg-red-800 px-5 py-2 text-white rounded leading-tight"
          onClick={confirmDeleteOrder}
        >
          Deleted Order
        </button>
      </div>
    </div>
  )
}
