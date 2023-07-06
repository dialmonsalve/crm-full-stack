import { isValidObjectId } from 'mongoose';

import Customer from '../models/Customer';
import Order from '../models/Order';

;import { ApolloContext, ICustomer } from '../types';

const getCustomers = async () => {

  try {
    const customers = await Customer.find();

    return customers;

  } catch (error) {
    console.log(error);
    return;
  };
};

const getCustomer = async (_: any, { id }: { id: string }, { user }: ApolloContext) => {

  const customer = await Customer.findById(id)

  if (!isValidObjectId(id)) {
    throw new Error('Not is a valid id')
  };

  if (!customer) {
    throw new Error('Customer does not exist')
  };

  if (customer.salesperson.toString() !== user?.id) {
    throw new Error('You do not have a valid credentials')
  };
  return customer
};

const getCustomerBySalesperson = async (_: any, { }, { user }: ApolloContext) => {

  if (user === undefined) return;

  try {

    const customer = await Customer.find({ salesperson: user.id.toString() })

    return customer;
  } catch (error) {
    console.log(error);
    return;
  };
};

const createCustomer = async (_: any, { input }: { input: ICustomer }, ctx: ApolloContext) => {

  const { email } = input;

  const customer = await Customer.findOne({ email });
  if (customer) throw new Error('Customer already exists');
  const newCustomer = new Customer(input);

  if (ctx.user === undefined) return;

  newCustomer.salesperson = ctx.user.id;

  try {

    const result = await newCustomer.save();

    return result;

  } catch (error) {
    console.log(error);
    return
  };
};

const updateCustomer = async (_: any, { id, input }: { id: string, input: ICustomer }, { user }: ApolloContext) => {

  let customer = await Customer.findById(id);

  if (!isValidObjectId(id)) {
    throw new Error('Not is a valid id');
  };

  if (!customer) {
    throw new Error('Product does not exist');
  };

  if (customer.salesperson.toString() !== user?.id) {
    throw new Error('You do not have a valid credentials');
  };

  try {
    customer = await Customer.findOneAndUpdate({ _id: id }, input, { new: true });

    return customer;
  } catch (error) {
    throw new Error(`Email already exists`)
  };
};

const deleteCustomer = async (_: any, { id }: { id: string }, { user }: ApolloContext) => {
  let customer = await Customer.findById(id)

  if (!isValidObjectId(id)) {
    throw new Error('Not is a valid id');
  };

  if (!customer) {
    throw new Error('Customer does not exist');
  };

  if (customer.salesperson.toString() !== user?.id) {
    throw new Error('You do not have a valid credentials');
  };

  customer = await Customer.findOneAndDelete({ _id: id });

  return 'customer has been deleted';
}

const getBetterCustomers = async () => {
  
  const customers = await Order.aggregate([
    { $match: { status: 'COMPLETED' } },
    {
      $group: {
        _id: '$customer',
        total: { $sum: '$total' }
      }
    },
    {
      $lookup: {
        from: 'customers',
        localField: '_id',
        foreignField: '_id',
        as: 'customer'
      }
    },
    { $limit: 10, }, { $sort: { total: -1 } }
  ]);

  return customers;
};

const Customers = {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomerBySalesperson,
  getCustomers,
  updateCustomer,
  getBetterCustomers
};

export default Customers;