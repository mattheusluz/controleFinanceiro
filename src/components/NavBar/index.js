import './style.css';
import ModalUsuario from '../NavBar/ModalUsuario'; 
import arrowDown from '../../assets/arrowDown.svg';

function navBar(){
  return(
    <div className='navBar'>
      <h1 className='nome'>Olá, Pessoa!</h1>
      <img className='imgModal' src={arrowDown} alt='Flexa para baixo' />
      <ModalUsuario />
    </div>
  )
}

export default navBar;