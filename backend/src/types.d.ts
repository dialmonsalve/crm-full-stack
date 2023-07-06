
export interface IUser {
  id: string
  name: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface IAuthInput extends Pick<IUser, 'email' | 'password'> { }

export type TypeCreateToken =
  (user: IUser, secret: string | undefined, expiration: string) => void

export interface IProduct {
  id: string
  name: string;
  stock: number;
  price: number;
  createdAt?: Date;
}

export interface ICustomer extends IUser{
  company: string;
  phone?: string;
  salesperson: IUser | string
}

export interface IOrder {
  id: string
  order: Array<OrderProductInput | undefined>;
  total: number;
  customer: ICustomer;
  salesperson: IUser | string;
  status: StatusType;
  createdAt?: Date;
}

interface OrderProductInput {
  id: string
  quantity: number
}

type StatusType = 'COMPLETED' | 'CANCELED' | 'PENDING'

export interface ApolloContext {
  user?: IUser
}
