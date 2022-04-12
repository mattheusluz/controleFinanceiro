import './style.css';
import logoDindin from '../../assets/logoDindin.svg';
import NavBar from '../NavBar';

function Header(){
  return(
    <header className='container-header'>
      <div className="logo">
        <img src={logoDindin} alt="Logo Dindin" className='logo' />
        <h1 className='titulo'>Dindin</h1>
      </div>
      <NavBar />
    </header>
  )
}

export default Header;