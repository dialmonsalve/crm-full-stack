// Order Schema
const orderTypeDefs = `
      #//! Types
      type Order {
        id: ID
        order: [OrderGroup]
        total: Float
        customer: Customer
        salesperson: ID
        createdAt: String
        status: StatusOrder
      }

      type OrderGroup {
        id: ID
        name: String
        price: Int
        quantity: Int
      }

      #//! Inputs
      input OrderProductInput {
        id: ID!
        name: String!
        price: Int!
        quantity: Int!
      }

      input OrderInput {
        order: [OrderProductInput]
        total: Float
        customer: ID
        status: StatusOrder
      }

      #//! Enums
      enum StatusOrder {
        COMPLETED
        CANCELED
        PENDING
      }

      #//! Queries
      type Query {
        getOrders: [Order]
        getOrderBySalesperson:[Order]
        getOrder(id: ID!): Order
        getOrderByStatus(status: StatusOrder!): [Order]
      }

      type Mutation {
        createOrder(input: OrderInput): Order
        updateOrder(id: ID!, input: OrderInput): Order
        deleteOrder(id: ID!): String
      }
`

export default orderTypeDefs;