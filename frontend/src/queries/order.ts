import { gql } from "@apollo/client";

export const GET_ORDERS_BY_SALESPERSON = gql`
query getOrderBySalesperson {
  getOrderBySalesperson {
    id
  }
}
`

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      id
      status
    }
  }
`

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`

export const CREATE_ORDER = gql`
mutation createOrder($input: OrderInput) {
  createOrder(input: $input) {
    id
  }
}
`

// export const CREATE_ORDER = gql`
// mutation createOrder($input: OrderInput) {
//   createOrder(input: $input) {
//     id
//     customer{
//       id
//     }
//     salesperson
//     order {
//       id
//       quantity
//       price
//       name
//     }
//     status
//     total
//   }
// }

// `

export const GET_ORDERS = gql`
query getOrderBySalesperson {
  getOrderBySalesperson {
    id
    order {
      id
      quantity
      name
    }
    customer {
      id
      name
      lastName
      email
      phone
    }
    salesperson
    createdAt
    status
    total
  }
}
`