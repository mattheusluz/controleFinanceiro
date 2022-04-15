import { useContext, useState } from 'react';
import './style.css';
import '../../globalStyles/styles.css';
import { NavLink, useHistory } from 'react-router-dom';
import HeaderLogin from '../../components/HeaderLogin';
import '../../globalStyles/styles.css';
import UserContext from '../../contexts/userContext';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState(null);

  const { setToken } = useContext(UserContext);

  const history = useHistory();

  const loginUsuario = async (e) => {
    e.preventDefault();
    setErroLogin(null);

    try {
      const dados = {
        email,
        senha,
      }

      const resposta = await fetch('https://sistemacontrolefinanceiro.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      const data = await resposta.json();

      if (data.erro) {
        setErroLogin(data.erro);
        return
      }

      if (data.token) {
        const token = data.token;
        window.localStorage.setItem("token", token);
        setToken(token);
      }

      history.push('/main');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <HeaderLogin className='header' />
      <div className='page'>
        <div className="containerLogin">
          <form onSubmit={loginUsuario} className='formLogin'>
            <h1 className='titleLogin'>
              Login
            </h1>
            <label htmlFor="email" className='labelLogin'>
              E-mail:
            </label>
            <input
              id='email'
              type="text"
              className={
                erroLogin
                  && erroLogin.includes('email')
                  ? 'erroInput inputLogin'
                  : 'inputLogin'
              }
              placeholder='Digite um e-mail válido'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {
              erroLogin
              && erroLogin.includes('email')
              && < span className='spanErro' > {erroLogin}</span>
            }
            <label htmlFor="senha" className='labelLogin'>
              Senha:
            </label>
            <input
              id='senha'
              type="password"
              className={
                erroLogin
                  && erroLogin.includes('senha')
                  ? 'erroInput inputLogin'
                  : 'inputLogin'
              }
              placeholder='Digite a senha'
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
            />
            {
              erroLogin
              && erroLogin.includes('senha')
              && < span className='spanErro' > {erroLogin}</span>
            }
            <button type='submit' className='buttonEntrar'>
              Entrar
            </button>
          </form>
          <div className="fazerCadastro">
            <span className='conta'>
              Ainda não tem uma conta?
            </span>
            <NavLink to={'/cadastro'} className='buttonConta'>
              Criar uma conta
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;