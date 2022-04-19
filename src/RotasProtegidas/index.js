import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from '../contexts/userContext'

const RotasProtegidas = ({ children }) => {

  const { token } = useContext(UserContext);

  const tokenStorage = window.localStorage.getItem('token');

  const novoToken = tokenStorage ? tokenStorage : token;

  return (
    <Route
      render={() => novoToken ? (children) : (<Redirect to='/login' />)}
    />
  )
}

export default RotasProtegidas;