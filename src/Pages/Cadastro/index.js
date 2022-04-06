import './style.css';
import '../../globalStyles/styles.css';
import Header from '../../components/Header';
import {NavLink} from 'react-router-dom';

function Cadastro(){
  return(
    <>
    <Header className='header'/>
    <div className='page'>
      <div className="container">
        <form type='submit' className='form'>
          <h1 className='titleLogin'>Cadastrar usuário</h1>
          <label htmlFor="" className='label'>
            Nome Completo:
          </label>
          <input type="text" className='input' placeHolder='Digite o nome completo' />
          <label htmlFor="" className='label'>
            E-mail:
          </label>
          <input type="text" className='input' placeHolder='Digite o e-mail' />
          <div className="senhas">
            <label htmlFor="" className='labelSenhas'>
              Senha:
            </label>
            <input type="password" className='inputSenha' placeHolder='Digite sua senha' />
            <label htmlFor="" className='labelSenhas'>
              Confirmar Senha:
            </label>
            <input type="password" className='inputSenha' placeHolder='Digite novamente sua senha' />
          </div>
          <NavLink to={'/cadastroConcluido'} className='buttonEntrar'>Cadastrar</NavLink>
        </form>
      </div>
    </div>
    </>
  )
}

export default Cadastro;