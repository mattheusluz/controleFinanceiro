import { useContext, useState } from 'react';
import CloseIcon from '../../assets/closeBtn.svg';
import editIcon from '../../assets/editarUsuario.svg'
import UserContext from '../../contexts/userContext';
import './style.css';

export default function ModalUsuario() {
  const {
    openEditUserModal,
    setOpenEditUserModal,
    dadosUsuario,
    setDadosUsuario,
    handleDadosUsuario
  } = useContext(UserContext);

  const [erroEdicao, setErroEdicao] = useState(null);

  function handleClose() {
    setOpenEditUserModal(false);
  }

  const editarUsuario = async (e) => {
    e.preventDefault();
    setErroEdicao(null);

    try {
      const resposta = await fetch('https://sistemacontrolefinanceiro.herokuapp.com/usuarios', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosUsuario),
      });

      const data = await resposta.json();

      if (data.erro) {
        setErroEdicao(data.erro);
        return
      }

      handleDadosUsuario();
      setOpenEditUserModal()
      setDadosUsuario({ ...dadosUsuario, senha: '' })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="backdrop" style={{ display: !openEditUserModal && 'none' }}>
      <div className="modal-containerEdit">
        <img
          className="close-icon"
          src={CloseIcon}
          alt="Close icon"
          onClick={() => handleClose()}
        />

        <h2 >
          <img className='editIcon' src={editIcon} alt="icone de editar" />
          Editar Usuario
        </h2>

        <form className='form' onSubmit={editarUsuario}>
          <label htmlFor="nome" className='label'>
            Nome:
          </label>
          <input
            id='nome'
            type="text"
            className={
              erroEdicao
                && erroEdicao.includes('nome')
                ? 'erroInput inputEdit'
                : 'inputEdit'
            }
            placeholder='Digite o nome completo'
            onChange={(e) => setDadosUsuario({ ...dadosUsuario, nome: e.target.value })}
            value={dadosUsuario.nome}
          />
          {
            erroEdicao
            && erroEdicao.includes('nome')
            && < span className='spanErro' > {erroEdicao}</span>
          }
          <label htmlFor="emailCadastro" className='labelEdit'>
            E-mail:
          </label>
          <input
            id='emailCadastro'
            type="text"
            className={
              erroEdicao
                && erroEdicao.includes('email')
                ? 'erroInput inputEdit'
                : 'inputEdit'
            }
            placeholder='Digite o e-mail'
            onChange={(e) => setDadosUsuario({ ...dadosUsuario, email: e.target.value })}
            value={dadosUsuario.email}
          />
          {
            erroEdicao
            && erroEdicao.includes('email')
            && < span className='spanErro' > {erroEdicao}</span>
          }
          <div className="senha">
            <label htmlFor="senha1" className='labelSenhas'>
              Digite sua senha:
            </label>
            <input
              id='senha1'
              type="password"
              className={
                erroEdicao
                  && erroEdicao.includes('senha')
                  ? 'erroInput inputSenhaEdit'
                  : 'inputSenhaEdit'
              }
              placeholder='Digite uma senha'
              onChange={(e) => setDadosUsuario({ ...dadosUsuario, senha: e.target.value })}
              value={dadosUsuario.senha}
            />
            {
              erroEdicao
              && erroEdicao.includes('senha')
              && < span className='spanErro' > {erroEdicao}</span>
            }
          </div>
          <div className="buttonEdit">
            <button type='submit' className='buttonEditUser'>Confirmar</button>
          </div>
        </form>
      </div>
    </div >
  )
}