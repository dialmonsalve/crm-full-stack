import { gql } from '@apollo/client';

export const GET_COSTUMERS_BY_SALESPERSON = gql`
  query getCustomerBySalesperson{
    getCustomerBySalesperson {
      id
      name
      lastName
      company
      email
    }
  }
`

export const GET_CUSTOMER_BY_ID = gql`
  query getCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      name
      lastName
      email
      company
      phone
    }
  }
`

export const GET_BETTER_CUSTOMERS = gql`
query getBetterCustomers {
  getBetterCustomers {
    customer {
      name
      company
    }
    total
  }
}
`

export const CREATE_CUSTOMER = gql`
mutation createCustomer($input:CustomerInput){
  createCustomer(input: $input) {
    id
    name
    lastName
    email
    company
    phone
  }
}
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($id: ID!, $input: CustomerInput) {
    updateCustomer(id: $id, input: $input) {
      id
      name
      lastName
      email
      company
      phone
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id)
  } 
`


