// User Schema
const userTypeDefs = `
      #//! Types
      type User {
        id: ID
        name: String
        lastName: String
        email: String
        createdAt: String
      }
      
      type TopSalespersons {
        total: Float
        salesperson: [User]
      }

      type Token {
        token: String
      }
      #//! Inputs
      input UserInput {
        name: String!
        lastName: String!
        email: String!
        password: String!
      }

      input AuthInput {
        email: String!
        password: String!
      }

      type Query {
        getUser: User
        getBetterSalespersons: [TopSalespersons]
      }

      type Mutation {
        createUser(input: UserInput): User
        authUser(input:AuthInput): Token
      }
  `;

  export default userTypeDefs;