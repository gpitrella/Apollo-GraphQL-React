import React, { useEffect, useState } from "react"
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from './persons/graphql-mutations.js'


export const PhoneForm = ({ notifyError }) => {

   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')

   const [ changeNumber, result ] = useMutation(EDIT_NUMBER)
   
   useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      notifyError('Person not found')
      console.error('Person not found')
    }
   },[result.data])

   const submit = (event) => {
        event.preventDefault()
        changeNumber({ variables: { name, phone }})
 
        setName('')
        setPhone('')
   }


  return (
    <div>
      <h2>Edit Phone Number: </h2>
      <form onSubmit={submit}>
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
        <button type='submit'>Edit Number</button>
      </form>
    </div>
  )

}

export default PhoneForm