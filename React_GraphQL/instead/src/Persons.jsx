import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from "@apollo/client";

const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!){
    findPerson(name: $nameToSearch) {
      name
      phone
      canDrink
      id
      direction {
         street
         city
      }
    }
  }
`;

const Persons = ({ persons }) => {
    
    const [ getPerson, result ] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)

    const showPerson = name => {
        getPerson({ variables: { nameToSearch: name }})
    }

    useEffect(() => {
        if (result.data) {
            setPerson(result.data.findPerson)
        }
    }, [result])

    if (person) {
        return (
            <div>
                <h2>Name: { person.name }</h2>
                <div>ID: { person.id }</div>
                <div>Phone: { person.phone }</div>
                <div>Direction: { person.direction.street }, { person.direction.city }</div>
                <button onClick={() => setPerson(null)}>Close</button>
            </div>
        )
    }

    if (persons === null) return null;

    return (
        <div>
            <h2>Persons</h2>
            {persons.map(p => <div key={p.id} onClick={() => { showPerson(p.name) }}>
                {p.name} {p.phone}    
            </div>)}
        </div>
    )
}

export default Persons;