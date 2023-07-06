import { createContext } from 'react';

import { ICustomer, IProduct } from '@/type';

export interface NewProduct extends IProduct {
  quantity:number
  __typename?:string
}

interface ContextProps {
  customer: ICustomer
  products: NewProduct[]
  total: number
  addCustomer:(customer:ICustomer)=>void
  addProducts: (products:NewProduct[])=>void
  quantityProducts:(newProduct:NewProduct)=>void
  updateTotal:()=>void
}

export const OrdersContext = createContext({} as ContextProps)