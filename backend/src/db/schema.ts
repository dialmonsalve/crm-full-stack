import orderTypeDefs from '../schema/order';
import userTypeDefs from '../schema/user';
import productTypeDefs from '../schema/product';
import customerTypeDefs from '../schema/customer';

// !The GraphQL schema
const typeDefs = `
     ${userTypeDefs}
     ${productTypeDefs}
     ${customerTypeDefs}
     ${orderTypeDefs}
  `;

export default typeDefs