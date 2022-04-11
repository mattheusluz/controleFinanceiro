import './style.css';
import ModalUsuario from '../NavBar/ModalUsuario'; 
import arrowDown from '../../assets/arrowDown.svg';

function navBar({popup, setPopup}){
  const handleabrirMenu = () => {
    popup ? setPopup(false) : setPopup(true);
  }
  return(
    <div className='navBar'>
      <h1 className='nome'>Olá, Pessoa!</h1>
      <img className='imgModal' 
      src={arrowDown} 
      alt='Flexa para baixo' onClick={handleabrirMenu} />
      <ModalUsuario 
      popup={popup}
      setPopup={setPopup}
      />
    </div>
  )
}

export default navBar;