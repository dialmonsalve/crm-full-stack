export interface IUser {
  id?: string
  name: string;
  lastName: string;
  email: string;
  password?: string;
  createdAt?: Date;
}

interface IOrder {
  id: string
  order: OrderGroup[]
  total: number
  customer: ICustomer
  salesperson: string
  createdAt?: Date
  status: StatusOrderType
}

export interface OrderStatus extends Pick<IOrder, 'id' | 'status'> { }

interface OrderGroup {
  id: string
  quantity: number
  name: string
}

export type StatusOrderType = | "COMPLETED" | "CANCELED" | "PENDING"

interface IProduct {
  id?: string
  name: string
  stock: number
  price: number
  createdAt?: Date
}


interface ICustomer extends IUser {
  company: string
  phone?: string
  salesperson?: IUser | string
}

export type TopSalespersons = {
  total: Float
  salesperson: [User]
}


export type TopCustomer = {
  total: Float
  customer: [Customer]
}

export interface UserAuth extends Pick<IUser, 'email' | 'password'> { }

export type Data = {
  getCustomerBySalesperson: ICustomer[]
  createUser: IUser
  getUser: IUser
  createCustomer: Customer
  getCustomer: Customer
  updateCustomer: Customer
  getProducts: IProduct[]
  createProduct: IProduct
  getProduct: IProduct
  createOrder: IOrder
  getOrderBySalesperson: IOrder[]
  updateOrder: OrderStatus
  getBetterSalespersons: TopSalespersons[]
  getBetterCustomers: TopCustomer[]
}