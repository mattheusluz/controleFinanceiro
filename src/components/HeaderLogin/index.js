import './style.css';
import logoDindin from '../../assets/logoDindin.svg'; 

function Header(){
  return(
    <header className='container-header'>
      <img src={logoDindin} alt="Logo Dindin" className='logo' />
      <h1 className='titulo'>Dindin</h1>
    </header>
  )
}

export default Header;