import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import './index.css'

const client = new ApolloClient({
  connectToDevTools: true,
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});


createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
