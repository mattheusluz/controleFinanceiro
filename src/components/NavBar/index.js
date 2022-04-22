import React, { useContext } from 'react';
import arrowDown from '../../assets/arrowDown.svg';
import arrowUp from '../../assets/arrowUp.png';
import UserContext from '../../contexts/userContext';
import ModalUsuario from '../NavBar/ModalUsuario';
import { 
  capitalizarUpperCase 
} from '../../utils/formatters';
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
        <h1 className='nome'>Olá, {nomeUsuario && capitalizarUpperCase(nomeUsuario)}</h1>
      </div>
      <div className="displayMenu">
        {popup
          ? <img className='imgModal'
            src={arrowDown}
            alt='Menu fechado'
            onClick={() => setPopup(false)}
          />
          : <img className='imgModal'
            src={arrowUp}
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