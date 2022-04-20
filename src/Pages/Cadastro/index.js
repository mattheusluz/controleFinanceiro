import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import HeaderLogin from '../../components/HeaderLogin';
import '../../globalStyles/styles.css';
import './style.css';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [erroCadastro, setErroCadastro] = useState(null);

  const history = useHistory();

  const cadastroUsuario = async (e) => {
    e.preventDefault();
    setErroCadastro(null);

    try {
      const dados = {
        nome,
        email,
        senha
      }

      if (senha.length === 0) {
        setErroCadastro('senha é um campo obrigatório');
        return;
      }

      if (senha !== repetirSenha || repetirSenha.length === 0) {
        setErroCadastro('As senhas não conferem');
        return;
      }

      const resposta = await fetch('https://sistemacontrolefinanceiro.herokuapp.com/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      const data = await resposta.json();

      if (data.erro) {
        setErroCadastro(data.erro);
        return
      }

      history.push('/cadastroConcluido');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <HeaderLogin className='header' />
      <div className='page'>
        <div className="container">
          <form onSubmit={cadastroUsuario} className='form'>
            <h1 className='title'>Cadastrar usuário</h1>
            <label htmlFor="nome" className='label'>
              Nome Completo:
            </label>
            <input
              id='nome'
              type="text"
              className={
                erroCadastro
                  && erroCadastro.includes('nome')
                  ? 'erroInput input'
                  : 'input'
              }
              placeholder='Digite o nome completo'
              onChange={(e) => setNome(e.target.value)}
              value={nome}
            />
            {
              erroCadastro
              && erroCadastro.includes('nome')
              && < span className='spanErro' > {erroCadastro}</span>
            }
            <label htmlFor="emailCadastro" className='label'>
              E-mail:
            </label>
            <input
              id='emailCadastro'
              type="text"
              className={
                erroCadastro
                  && erroCadastro.includes('email')
                  ? 'erroInput input'
                  : 'input'
              }
              placeholder='Digite o e-mail'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {
              erroCadastro
              && erroCadastro.includes('email')
              && < span className='spanErro' > {erroCadastro}</span>
            }
            <div className="senhas">
              <label htmlFor="senha1" className='labelSenhas'>
                Senha:
              </label>
              <input
                id='senha1'
                type="password"
                className={
                  erroCadastro
                    && erroCadastro.includes('senha')
                    ? 'erroInput inputSenha'
                    : 'inputSenha'
                }
                placeholder='Digite uma senha'
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
              />
              {
                erroCadastro
                && erroCadastro.includes('senha')
                && < span className='spanErro' > {erroCadastro}</span>
              }
              <label
                htmlFor="senha2"
                className='labelSenhas'
              >
                Confirmar Senha:
              </label>
              <input
                id='senha2'
                type="password"
                className={
                  erroCadastro
                    && erroCadastro.includes('senha')
                    ? 'erroInput inputSenha'
                    : 'inputSenha'
                }
                placeholder='Digite novamente'
                onChange={(e) => setRepetirSenha(e.target.value)}
                value={repetirSenha}
              />
              {
                erroCadastro
                && erroCadastro.includes('senha')
                && < span className='spanErro' > {erroCadastro}</span>
              }
            </div>
            <div className="buttons">
              <NavLink to={'/login'} className='buttonVoltar'>Voltar</NavLink>
              <button type='submit' className='buttonCadastrar'>Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Cadastro;