import { gql } from '@apollo/client'

export const CREATE_PERSON = gql`
mutation createPerson($age: String!, $name: String!, $phone: String!, $street: String!, $city: String!) {
  addPerson (
    age: $age
    name: $name 
    phone: $phone
    street: $street
    city: $city
  ) {
      name
      phone
      street
      id
    }     
}
`

export const EDIT_NUMBER = gql`
mutation editNumber ($name: String!, $phone: String!){
    editNumber(name: $name, phone: $phone) {
      name
      phone
      id
      city
      street
    }
}
`