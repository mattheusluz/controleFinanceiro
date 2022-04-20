import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import buttonSair from '../../../assets/buttonSair.svg';
import editar from '../../../assets/editarUsuario.svg';
import UserContext from '../../../contexts/userContext';
import './style.css';


function ModalUsuario() {

  const { popup, setPopup, setToken, setOpenEditUserModal } = useContext(UserContext);

  const history = useHistory();

  function handleAbirModal() {
    setOpenEditUserModal(true);
    setPopup(false);
  }

  function RemoverToken() {
    window.localStorage.removeItem("token");
    setToken(null);
    history.push('/login');
  }

  return (
    <div
      className='modalSair'
      style={{ display: !popup && 'none' }}
    >
      <div className="arrow-up">
      </div>
      <button
        className="editarUsuario"
        onClick={() => handleAbirModal()}
      >
        <img src={editar} alt='botão de editar' />
        <span
          className='span'
        >
          Editar Usuário
        </span>
      </button>
      <button
        className="buttonSair"
        onClick={() => RemoverToken()}
      >
        <img
          src={buttonSair}
          alt='botão de sair'
        />
        <span className='spanSair'>Sair</span>
      </button>
    </div>
  )
}

export default ModalUsuario;