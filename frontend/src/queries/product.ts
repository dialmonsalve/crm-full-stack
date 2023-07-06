import { gql, useMutation } from "@apollo/client";

export const DELETE_PRODUCT = gql`
mutation deleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
`

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      stock
    }
  }
`

export const GET_PRODUCT_BY_ID = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      stock
      price
    }
  }
`;

export const UPDATE_PRODUCT = gql`
mutation updateProduct($id: ID!, $input:ProductInput) {
    updateProduct(id: $id, input:$input) {
      id
      name
      stock
      price
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: ProductInput) {
    createProduct(input: $input) {
      id
      name
      price
      stock
    }
  }
`;

