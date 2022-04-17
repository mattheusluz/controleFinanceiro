import { useContext, useState } from 'react';
import UserContext from '../../contexts/userContext';
import CloseIcon from '../../assets/closeBtn.svg';
import './style.css';

export default function ModalUsuario ( ) {
  const { openEditUserModal, setOpenEditUserModal} = useContext(UserContext);

  function handleClose() {
    setOpenEditUserModal(false);
  }

  return (
    <div className="backdrop" style={{ display: !openEditUserModal && 'none' }}>
      <div className="modal-container">
        <img
          className="close-icon"
          src={CloseIcon}
          alt="Close icon"
          onClick={() => handleClose()}
        />

        <h2 >Editar Usuario</h2>

        <form className='form'>
        {/* onSubmit={EditarUsuario} */}
          <label htmlFor="nome" className='label'>
            Nome Completo:
          </label>
          {/* <input
            id='nome'
            type="text"
            className={
              erroEdicao
                && erroEdicao.includes('nome')
                ? 'erroInput input'
                : 'input'
            }
            placeholder='Digite o nome completo'
            onChange={(e) => setEditarNome(e.target.value)}
            value={nome}
          />
          {
            erroEdicao
            && erroEdicao.includes('nome')
            && < span className='spanErro' > {erroEdicao}</span>
          } */}
          <label htmlFor="emailCadastro" className='label'>
            E-mail:
          </label>
          {/* <input
            id='emailCadastro'
            type="text"
            className={
              erroEdicao
                && erroEdicao.includes('email')
                ? 'erroInput input'
                : 'input'
            }
            placeholder='Digite o e-mail'
            onChange={(e) => setEditarEmail(e.target.value)}
            value={email}
          />
          {
            erroEdicao
            && erroEdicao.includes('email')
            && < span className='spanErro' > {erroEdicao}</span>
          } */}
          <div className="senhas">
            <label htmlFor="senha1" className='labelSenhas'>
              Senha:
            </label>
            {/* <input
              id='senha1'
              type="password"
              className={
                erroEdicao
                  && erroEdicao.includes('senha')
                  ? 'erroInput inputSenha'
                  : 'inputSenha'
              }
              placeholder='Digite uma senha'
              onChange={(e) => setEditarSenha(e.target.value)}
              value={senha}
            /> 
            {
              erroEdicao
              && erroEdicao.includes('senha')
              && < span className='spanErro' > {erroEdicao}</span>
            }*/}
            <label
              htmlFor="senha2"
              className='labelSenhas'
            >
              Confirmar Senha:
            </label>
            {/* <input
              id='senha2'
              type="password"
              className={
                erroEdicao
                  && erroEdicao.includes('senha')
                  ? 'erroInput inputSenha'
                  : 'inputSenha'
              }
              placeholder='Digite novamente'
              onChange={(e) => setRepetirEditarSenha(e.target.value)}
              value={repetirEditarSenha}
            />
            {
              erroEdicao
              && erroEdicao.includes('senha')
              && < span className='spanErro' > {erroEdicao}</span>
            } */}
          </div>
          <div className="buttons">
            <button type='submit' className='buttonCadastrar'>Confirmar</button>
          </div>
        </form>
      </div>
    </div >
  )
}