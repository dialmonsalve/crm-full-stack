import { isValidObjectId } from 'mongoose';

import Customer from '../models/Customer';
import Order from '../models/Order';
import Product from '../models/Product';

import { ApolloContext, IOrder, StatusType } from '../types';

const getOrders = async () => {

  try {
    const orders = await Order.find();

    return orders

  } catch (error) {
    console.log(error);
    return;
  };
};

const getOrderBySalesperson = async (_: any, { }, { user }: ApolloContext) => {

  try {
    const orders = await Order.find({ salesperson: user?.id }).populate('customer');

    return orders

  } catch (error) {
    console.log(error);
    return;
  };
};

const getOrder = async (_: any, { id }: { id: string }, { user }: ApolloContext) => {

  const order = await Order.findById(id);

  if (!isValidObjectId(id)) {
    throw new Error('Not is a valid id');
  };

  if (!order) {
    throw new Error('Order does not exist');
  };

  if (order.salesperson.toString() !== user?.id) {
    throw new Error('You do not have a valid credentials');
  };
  return order;
};

const getOrderByStatus = async (_: any, { status }: { status: StatusType }, { user }: ApolloContext) => {
  const orders = await Order.find({ salesperson: user?.id, status });
  return orders;
};

const createOrder = async (_: any, { input }: { input: IOrder }, ctx: ApolloContext) => {

  const { customer } = input;

  // Valid if customer exists
  let customerExist = await Customer.findById(customer);

  if (!customerExist) throw new Error('Costumer do not exist');

  // Verify if costumer belongs to the salesperson
  if (customerExist.salesperson.toString() !== ctx.user?.id) {
    throw new Error('There is no valid credentials');
  };

  // Check if there is stock
  for await (const article of input.order) {
    if (article === undefined) return

    const { id } = article;

    const product = await Product.findById(id);

    if (typeof product === 'undefined' || product === null) return;

    if (article.quantity > product.stock) {
      throw new Error(`Article ${product.name} quantity available`);
    } else {
      product.stock = product.stock - article.quantity
      await product.save();
    };
  };

  // Create a new Order
  const newOrder = new Order(input);

  // Assign a salesperson
  newOrder.salesperson = ctx.user.id;

  // Save Order on DB
  const result = await newOrder.save();

  return result;
};

const updateOrder = async (_: any, { id, input }: { id: string, input: IOrder }, { user }: ApolloContext) => {

  const orderExists = await Order.findById(id);
  const { customer } = input;


  if (!isValidObjectId(id)) {
    throw new Error('Not is a valid id');
  };

  if (!orderExists) {
    throw new Error('Order does not exist');
  };

  const customerExists = await Customer.findById(customer);

  if (!customerExists) {
    throw new Error('Customer does not exist');
  };

  if (customerExists.salesperson.toString() !== user?.id) {
    throw new Error('You do not have a valid credentials');
  };

  if (input.order) {

    for await (const article of input.order) {

      if (article === undefined) return;;

      const { id } = article;

      const product = await Product.findById(id);

      if (typeof product === 'undefined' || product === null) return;

      if (article.quantity > product.stock) {
        throw new Error(`Article ${product.name} quantity available`);
      } else {
        product.stock = product.stock - article.quantity
        await product.save();
      };
    };
  };

  const result = await Order.findOneAndUpdate({ _id: id }, input, { new: true })

  return result;
};

const deleteOrder = async (_: any, { id }: { id: string }, { user }: ApolloContext) => {

  const order = await Order.findById(id);

  if (!isValidObjectId(id)) {
    throw new Error('Not is a valid id');
  };

  if (!order) {
    throw new Error('Order does not exist');
  };

  if (order.salesperson.toString() !== user?.id) {
    throw new Error('You do not have a valid credentials');
  };

  await Order.findOneAndDelete({ _id: id });

  return 'Order has been deleted';
};

const Orders = {
  createOrder,
  deleteOrder,
  getOrder,
  getOrderBySalesperson,
  getOrderByStatus,
  getOrders,
  updateOrder,
};

export default Orders;