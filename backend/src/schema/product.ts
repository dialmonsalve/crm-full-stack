// Products Schema
const productTypeDefs = `
      #//! Types
      type Product {
        id: ID
        name: String
        stock: Int
        price: Float
        createdAt: String
      }

      #//! Inputs
      input ProductInput {
        name: String!
        stock: Int!
        price: Float!
      }

      #//! Queries
      type Query {
        getProducts: [Product]
        getProduct(id: ID!): Product
        searchProduct(text: String!) : [Product]
      }

      type Mutation {
        createProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductInput): Product
        deleteProduct(id: ID!): String
      }
`

export default productTypeDefs