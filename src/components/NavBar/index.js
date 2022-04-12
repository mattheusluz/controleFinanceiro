import './style.css';
import ModalUsuario from '../NavBar/ModalUsuario'; 
import arrowDown from '../../assets/arrowDown.svg';
import arrowUp from '../../assets/arrowUp.png';
import React, { useContext } from 'react';
import UserContext from '../../contexts/userContext';

function NavBar(){
  const {popup, setPopup} = useContext(UserContext);

  return(
    <div className={`${popup && 'navBar'}`}>
      <h1 className='nome'>Olá, Pessoa!</h1>
      {popup 
      ?<img className='imgModal' 
        src={arrowDown} 
        alt='Flexa para baixo' 
        onClick={()=> setPopup(false)} 
      /> 
      :<img className='imgModal' 
        src={arrowUp} 
        alt='Flexa para cima' 
        onClick={()=> setPopup(true)} 
        />
      }
      
      <ModalUsuario 
      popup={popup}
      setPopup={setPopup}
      />
    </div>
  )
}

export default NavBar;