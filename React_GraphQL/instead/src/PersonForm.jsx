import React, { useState } from "react"
import { useMutation } from '@apollo/client'
import { ALL_PERSONS } from "./persons/graphql-queries.js"
import { CREATE_PERSON } from './persons/graphql-mutations.js'


export const PersonForm = ({notifyError}) => {
   const [age, setAge] = useState('')
   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')
   const [street, setStreet] = useState('')
   const [city, setCity] = useState('')

   const [ createPerson ] = useMutation(CREATE_PERSON, { 
     refetchQueries: [ { query: ALL_PERSONS } ],
     onError: (error) => {
        notifyError(error.graphQLErrors[0].message)
     }
   })

   const submit = (event) => {
        event.preventDefault()
        createPerson({ variables: { age, name, phone, street, city }})
 
        setName('')
        setPhone('')
        setStreet('')
        setCity('')
   }


  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={submit}>
        <div>
          age <input value={age}
            onChange={({ target }) => setAge(target.value)}
          />
        </div>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street <input value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city <input value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )

}

export default PersonForm