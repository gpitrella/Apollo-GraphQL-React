import { gql } from '@apollo/client'

export const ALL_PERSONS = gql`
    query {
      allPersons {
        id
        name
        phone
        city
        age
        street
      }
    }
  `

export const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!){
    findPerson(name: $nameToSearch) {
      name
      phone
      canDrink
      id
    }
  }
`;