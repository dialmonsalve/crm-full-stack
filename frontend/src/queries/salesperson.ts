import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
      id
      name
      lastName
      email
    }
  }
`

export const USER_AUTH = gql`
    mutation authUser($input: AuthInput){
    authUser(input: $input) {
      token
    }
  }
`

export const GET_BETTER_SALESPERSONS = gql`
  query getBetterSalespersons {
    getBetterSalespersons {
      salesperson {
      name
      email
    }
    total
  }
}
`

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      lastName
    }
  }
`