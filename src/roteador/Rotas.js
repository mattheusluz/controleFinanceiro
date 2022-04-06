import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Cadastro from '../Pages/Cadastro';
import CadastroConcluido from '../Pages/Cadastro/CadastroConcluido';
import Main from '../Pages/Main';

const Rotas = () => {

  return (
    <Router>
      <Route component={Login} exact path="/login" />
      <Route component={Cadastro} path="/cadastro" />
      <Route component={CadastroConcluido} path="/cadastroConcluido" />
      <Route component={Main} path="/" exact />
    </Router>
  )
}

export default Rotas;