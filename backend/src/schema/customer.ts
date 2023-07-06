// Customer Schema
const customerTypeDefs = `
      #//! Types
      type Customer {
        id: ID
        name: String
        lastName: String
        company: String
        email: String
        phone: String
        createdAt: String
        salesperson: ID
      }

      type TopCustomer {
        total: Float
        customer: [Customer]
      }

      #//! Inputs
      input CustomerInput {
        name: String!
        lastName: String!
        company: String!
        email: String!
        phone: String
      }

      #//! Queries
      type Query {
        getCustomers: [Customer]
        getCustomer(id: ID!): Customer
        getCustomerBySalesperson: [Customer]
        getBetterCustomers: [TopCustomer]
      }

      type Mutation {
        createCustomer(input: CustomerInput): Customer
        updateCustomer(id: ID!, input: CustomerInput): Customer
        deleteCustomer(id: ID!): String
      }
`

export default customerTypeDefs