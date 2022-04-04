import './style.css';
import '../../globalStyles/styles.css';
import {NavLink} from 'react-router-dom';
import Header from '../../components/Header';

function Login(){
  return(
    <>
    <Header className='header'/>
    <div className='pageLogin'>
      <div className="containerLogin">
        <form type='submit' className='formLogin'>
          <h1 className='titleLogin'>Login</h1>
          <label htmlFor="" className='labelLogin'>
            Nome ou E-mail:
          </label>
          <input type="text" className='inputLogin' placeHolder='Digite o nome ou e-mail do usuário' />
          <label htmlFor="" className='labelLogin'>
            Senha:
          </label>
          <input type="password" className='inputLogin' placeHolder='Digite sua senha cadastrada' />
          <button type='submit' className='buttonEntrar'>Entrar</button>
        </form>
        <div className="fazerCadastro">
          <span className='conta'>Ainda não tem uma conta?</span> 
          <button className='buttonConta'>Criar uma conta</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login;