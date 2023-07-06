import { useContext } from "react";

import { OrdersContext } from "@/context/orders";

export const Total = () => {

  const { total } = useContext(OrdersContext);

  return (
    <div className="flex items-center mt-5 justify-between bg-gray-300 border-solid border-2 border-gray-500 text-gray-800" >
      <h2 className="text-gray-800 mt-0 text-lg">Total</h2>
      <p className="text-red-800 mt-0 font-bold">${total}</p>

    </div>



  )
}
