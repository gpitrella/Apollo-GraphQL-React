import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import { useQuery } from '@apollo/client'
import Persons from './Persons.jsx'
import PersonForm from './PersonForm.jsx'
import { ALL_PERSONS } from './persons/graphql-queries.js'
import { usePersons } from './persons/custom-hooks.js'
import './App.css'
import { Notify } from './Notify.jsx'
import { PhoneForm } from './PhoneForm.jsx'



function App() {
  const { data, loading, error } = usePersons(); 
  const [ errorMessage, setErrorMessage ] = useState(null)

  const notifyError = message => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  if (error) return <span style='color: red'>{error}</span>
  return (
    <>
      <Notify errorMessage={errorMessage} />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {loading
        ? <p>Loading...</p>
        : (<>
            <h1>GraphQL + React</h1>
            <Persons persons={data.allPersons} />
        </>)
      }
      <PhoneForm notifyError={notifyError}/>
      <PersonForm notifyError={notifyError}/>
      
    </>
  )
}

export default App
