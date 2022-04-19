import React, { useContext } from 'react';
import arrowDown from '../../assets/arrowDown.svg';
import arrowUp from '../../assets/arrowUp.png';
import UserContext from '../../contexts/userContext';
import ModalUsuario from '../NavBar/ModalUsuario';
import './style.css';

function NavBar() {

  const {
    popup,
    setPopup,
    nomeUsuario
  } = useContext(UserContext);

  return (
    <div className='navBar'>
      <div className="tituloMenu">
        <h1 className='nome'>Olá, {nomeUsuario && nomeUsuario}</h1>
      </div>
      <div className="displayMenu">
        {popup
          ? <img className='imgModal'
            src={arrowUp}
            alt='Menu fechado'
            onClick={() => setPopup(false)}
          />
          : <img className='imgModal'
            src={arrowDown}
            alt='Menu Aberto'
            onClick={() => setPopup(true)}
          />
        }
        <ModalUsuario
          popup={popup}
          setPopup={setPopup}
        />
      </div>
    </div>
  )
}

export default NavBar;