import { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import HeaderLogin from '../../components/HeaderLogin';
import UserContext from '../../contexts/userContext';
import { 
  capitalizarLowerCase 
} from '../../utils/formatters';
import hidepass from '../../assets/hidepass.svg';
import showpass from '../../assets/showpass.svg';
import '../../globalStyles/styles.css';
import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [erroLogin, setErroLogin] = useState(null);
  const [senha, setSenha] = useState({
    password: "",
    showPassword: false,
  });

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

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  const clickShowPassword = () => {
    setSenha({ ...senha, showPassword: !senha.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    capitalizarLowerCase(setSenha({ ...senha, [prop]: event.target.value }));
  };

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
              onChange={(e) => capitalizarLowerCase(setEmail(e.target.value))}
              value={email}
            >
            </input>
            {
              erroLogin
              && erroLogin.includes('email')
              && < span className='spanErro' > {erroLogin}</span>
            }
            <label htmlFor="senha" className='labelLogin'>
              Senha:
            </label>
            <div className="containerPass">
              <input
                id='senha'
                type={senha.showPassword ? "text" : "password"} 
                className={
                  erroLogin
                  && erroLogin.includes('senha')
                  ? 'erroInput inputLogin'
                  : 'inputLogin'
                }
                maxlength="20"
                placeholder='Digite a senha'
                onChange={handleChange("password")}
                value={senha.password}
              />
              {!senha.showPassword 
              ? <img 
                  src={hidepass} 
                  alt="Show password" 
                  className='showPassword'    
                  onClick={clickShowPassword}
                  onMouseDown={handleMouseDownPassword}        
                />
              : 
                <img 
                  src={showpass} 
                  alt="Show password" 
                  className='showPassword' 
                  onClick={clickShowPassword}
                  onMouseDown={handleMouseDownPassword}              
                />}
            </div>
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