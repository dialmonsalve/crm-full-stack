import { ReactNode, useCallback, useReducer } from 'react';

import { NewProduct, OrdersContext, ordersReducer } from './';
import { ICustomer } from '@/type';

export interface Props {
  children: ReactNode;
}

export interface OrdersState {
  customer: ICustomer
  products: NewProduct[]
  total: number
}


export const ORDERS_INITIAL_STATE: OrdersState = {
  customer: {} as ICustomer,
  products: [] as NewProduct[],
  total: 0
}

export const OrdersProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(ordersReducer, ORDERS_INITIAL_STATE);

  const addCustomer = useCallback((customer: ICustomer) => {

    dispatch({
      type: '[Orders] - addCustomer',
      payload: customer
    });
  }, [dispatch]);

  const addProducts = (productsSelected: NewProduct[]) => {


    let newState;

    if (state.products.length > 0) {
      newState = productsSelected.map(product => {
        const newObject = state.products.find(productState => productState.id === product.id)
        return { ...product, ...newObject }
      })
    } else {
      newState = productsSelected;
    }

    dispatch({
      type: '[Orders] - addProducts',
      payload: newState
    })
  }

  const quantityProducts = (newProduct: NewProduct) => {
    dispatch({
      type: '[Orders] - addQuantity',
      payload: newProduct
    });
  }


  const updateTotal = () => {
    dispatch({ type: '[Orders] - updateTotal' })
  }

  return (
    <OrdersContext.Provider value={{
      ...state,
      addCustomer,
      addProducts,
      quantityProducts,
      updateTotal
    }}>
      {children}
    </OrdersContext.Provider>
  )
}