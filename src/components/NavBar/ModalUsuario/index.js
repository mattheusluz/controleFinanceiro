import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import buttonSair from '../../../assets/buttonSair.svg';
import editar from '../../../assets/editarUsuario.svg';
import UserContext from '../../../contexts/userContext';
import './style.css';


function ModalUsuario() {

  const { popup, setPopup, setToken, openEditUserModal, setOpenEditUserModal } = useContext(UserContext);

  function handleAbirModal() {
      setOpenEditUserModal(true);
    }

  function RemoverToken() {
    window.localStorage.removeItem("token");
      setToken(null);
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
        onClick={()=>handleAbirModal()}
        >
        <img src={editar} alt='botão de editar' />
        <span 
          className='span'
        >
          Editar Usuário
        </span>
      </button>

      <NavLink 
      to={'/login'} 
      className="buttonSair"
      onClick={()=>RemoverToken()}
      >
        <img src={buttonSair} alt='botão de sair' />
        <span className='spanSair'>Sair</span>
      </NavLink>
    </div>
  )
}

export default ModalUsuario;