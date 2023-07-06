import { OrdersState } from './OrdersProvider';
import { NewProduct } from './OrdersContext';

import { ICustomer } from '@/type';

type OrdersActionType =
  | { type: '[Orders] - addCustomer', payload: ICustomer }
  | { type: '[Orders] - addProducts', payload: NewProduct[] }
  | { type: '[Orders] - addQuantity', payload: NewProduct }
  | { type: '[Orders] - updateTotal' }

export const ordersReducer = (state: OrdersState, action: OrdersActionType): OrdersState => {

  switch (action.type) {
    case '[Orders] - addCustomer':
      return {
        ...state,
        customer: action.payload
      }
    case '[Orders] - addProducts':
      return {
        ...state,
        products: action.payload
      }
    case '[Orders] - addQuantity':
      return {
        ...state,
        products: state.products.map(product => product.id === action.payload.id ? product = action.payload : product),
        // products: state.products.map(product => {
        //   if (product.id === action.payload.id) {
        //     return action.payload
        //   } else {
        //     return product
        //   }
        // })
      }
    case '[Orders] - updateTotal':
      return {
        ...state,
        total: state.products.reduce((newTotal, product) => newTotal += product.price * product.quantity, 0)
      }

    default:
      return state;
  }
}