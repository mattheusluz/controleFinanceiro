import './style.css';
import '../../../globalStyles/styles.css';
import HeaderLogin from '../../../components/HeaderLogin';
import cadastroConcluido from '../../../assets/icone-cadastro-concluido.svg';
import {NavLink} from 'react-router-dom';

function CadastroConcluido(){
  return(
    <>
    <HeaderLogin className='header'/>
    <div className='page'>
      <div className="containerConcluido">
        <img src={cadastroConcluido} className='imgConcluido' alt="icone cadastro concluido" />
        <h1 className='titleConcluido'>Usuário cadastrado com sucesso</h1>
        <NavLink to={'/'} className='buttonEntrar'>Ir para Login</NavLink>
      </div>
    </div>
    </>
  )
}

export default CadastroConcluido;