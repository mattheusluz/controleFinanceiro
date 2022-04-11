import './style.css';
import '../../globalStyles/styles.css';
import HeaderLogin from '../../components/HeaderLogin';
import {NavLink} from 'react-router-dom';

function Cadastro(){
  return(
    <>
    <HeaderLogin className='header'/>
    <div className='page'>
      <div className="container">
        <form type='submit' className='form'>
          <h1 className='title'>Cadastrar usuário</h1>
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
            <input type="password" className='inputSenha' placeHolder='Digite uma senha' />
            <label htmlFor="" className='labelSenhas'>
              Confirmar Senha:
            </label>
            <input type="password" className='inputSenha' placeHolder='Digite novamente' />
          </div>
        </form>
          <div className="buttons">
            <NavLink to={'/'} className='buttonVoltar'>Voltar</NavLink>
            <NavLink to={'/cadastroConcluido'} className='buttonCadastrar'>Cadastrar</NavLink>
          </div>
      </div>
    </div>
    </>
  )
}

export default Cadastro;