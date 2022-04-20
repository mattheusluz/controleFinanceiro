import { NavLink } from 'react-router-dom';
import cadastroConcluido from '../../../assets/icone-cadastro-concluido.svg';
import HeaderLogin from '../../../components/HeaderLogin';
import '../../../globalStyles/styles.css';
import './style.css';

function CadastroConcluido() {
  return (
    <>
      <HeaderLogin className='header' />
      <div className='pageDone'>
        <div className="containerConcluido">
          <img src={cadastroConcluido} className='imgConcluido' alt="icone cadastro concluido" />
          <h1 className='titleConcluido'>Usuário cadastrado com sucesso!</h1>
          <NavLink to={'/login'} className='buttonEntrar'>Ir para Login</NavLink>
        </div>
      </div>
    </>
  )
}

export default CadastroConcluido;