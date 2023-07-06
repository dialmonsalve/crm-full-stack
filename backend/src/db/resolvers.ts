

import Users from '../resolvers/user';
import Products from '../resolvers/product';
import Orders from '../resolvers/order';
import Customers from '../resolvers/customer';

//! A map of functions which return data for the schema.
const resolvers = {
  // !Queries
  Query: {
    getBetterSalespersons: Users.getBetterSalespersons,
    getUser: Users.getUser,

    getProduct: Products.getProduct,
    getProducts: Products.getProducts,
    searchProduct: Products.searchProduct,

    getBetterCustomers: Customers.getBetterCustomers,
    getCustomer: Customers.getCustomer,
    getCustomerBySalesperson: Customers.getCustomerBySalesperson,
    getCustomers: Customers.getCustomers,

    getOrder: Orders.getOrder,
    getOrderBySalesperson: Orders.getOrderBySalesperson,
    getOrderByStatus: Orders.getOrderByStatus,
    getOrders: Orders.getOrders,
  },
  // !Mutations
  Mutation: {
    authUser: Users.authUser,
    createUser: Users.createUser,

    createProduct: Products.createProduct,
    deleteProduct: Products.deleteProduct,
    updateProduct: Products.updateProduct,

    createCustomer: Customers.createCustomer,
    deleteCustomer: Customers.deleteCustomer,
    updateCustomer: Customers.updateCustomer,

    createOrder: Orders.createOrder,
    deleteOrder: Orders.deleteOrder,
    updateOrder: Orders.updateOrder,
  }
};

export default resolvers;

