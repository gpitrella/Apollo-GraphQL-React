import { ApolloServer } from '@apollo/server'; // preserve-line
import { GraphQLError } from 'graphql';
import axios from 'axios';

import { startStandaloneServer } from '@apollo/server/standalone'; // preserve-line
import { v1 as uuid } from 'uuid';

const persons = [
  {
    name: "MiduDev",
     age: "22",
     phone: "034-1213457",
     street: "Calle Fontend",
     city: "Barcelona",
     id: "3gufjdhysg-3423-87fjd-38377389djfnf"
   },
   {
     name: "YourSeftDev",
     age: "17",
     phone: "033-128755457",
     street: "Avenida Full Stack",
     city: "Matedero",
     id: "dfadfjdhysg-3423-dfad-3837fad9djfnf"
   },
   {
     name: "Gabriel",
     age: "37",
     street: "Pasaje old",
     city: "Ibiza",
     id: "3gfadssg-3423-87fjd-3837dasdadanf"
   }
 ]

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  enum YesNo {
    YES
    NO
  }
  type Address {
    street: String!
    city: String!
  }
  
  type Person {
        age: String!
        name: String!
        phone: String
        street: String!
        city: String!
        address: String!
        check: String!
        canDrink: String!
        id: ID!
        direction: Address!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      age: String!
      name: String!
      phone: String!
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      personCount: () => persons.length,
      allPersons: async (root, args) => {
        // const { data: personsFromRestApi } =  await axios.get('http://localhost:3000/persons')
        if (!args.phone) return persons
        return persons.filter(person => {
          return args.phone === "YES" ? person.phone : !person.phone
        });      
      },
      findPerson: async (root, args) => {
        //const { data: personsFromRestApi } =  await axios.get('http://localhost:3000/persons')
        const { name } = args
        return persons.find(person => person.name === name)
      }
    },
    Person: {
        canDrink: (root) =>  `${root.age}` > 18 ? 'Yes' : 'No',
        address: (root) =>  `Direction: ${root.street}, ${root.city}`,
        check: () => "midu",
        direction: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    },
    Mutation: {
        addPerson: (root, args) => {
            if (persons.find(p => p.name === args.name)) {
              
              throw new GraphQLError('Bad input name already exist.', {
                extensions: { code: 'Bad input:', invalidArgs: args.name},
              });
              
             } 
                // const { name, phone, street, city } = args
                const person = { ...args, id: uuid() }
                persons.push(person) // update database with new person
                return person
           
        },

        editNumber: (root, args) => {
          const personIndex = persons.findIndex(p => p.name === args.name)
          if(personIndex === -1) return null

          const person = persons[personIndex]
          const updatedPerson = { ...person, phone: args.phone }
          persons[personIndex] = updatedPerson
          return updatedPerson
        }

    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);