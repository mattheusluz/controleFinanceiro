import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Cadastro from '../Pages/Cadastro';
import CadastroConcluido from '../Pages/Cadastro/CadastroConcluido';
import Main from '../Pages/Main';
import RotasProtegidas from '../RotasProtegidas';

const Rotas = () => {

  return (
    <Router>
      <Route component={Login} path="/login" exact />
      <Route component={Cadastro} path="/cadastro" exact />
      <Route component={CadastroConcluido} path="/cadastroConcluido" exact />
      <RotasProtegidas>
        <Route component={Main} path="/" exact />
      </RotasProtegidas>
    </Router>
  )
}

export default Rotas;