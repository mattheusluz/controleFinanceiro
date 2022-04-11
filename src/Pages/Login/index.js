import './style.css';
import '../../globalStyles/styles.css';
import {NavLink} from 'react-router-dom';
import HeaderLogin from '../../components/HeaderLogin';

function Login(){
  return(
    <>
    <HeaderLogin className='header'/>
    <div className='pageLogin'>
      <div className="containerLogin">
        <form type='submit' className='formLogin'>
          <h1 className='titleLogin'>Login</h1>
          <label htmlFor="" className='labelLogin'>
            E-mail:
          </label>
          <input type="text" className='inputLogin' placeHolder='Digite um e-mail válido' />
          <label htmlFor="" className='labelLogin'>
            Senha:
          </label>
          <input type="password" className='inputLogin' placeHolder='Digite a senha' />
          <NavLink to={'/main'} type='submit' className='buttonEntrar'>Entrar</NavLink>
        </form>
        <div className="fazerCadastro">
          <span className='conta'>Ainda não tem uma conta?</span> 
          <NavLink to={'/cadastro'} className='buttonConta'>Criar uma conta</NavLink>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login;