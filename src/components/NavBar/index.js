import './style.css';
import { NavLink as BrowserLink } from "react-router-dom";

function navBar(){
  return(
    <div className='navBar'>
      <BrowserLink to={'/'} className='linkNav'>Página Principal</BrowserLink>
      <BrowserLink to={'/login'} className='linkNav'>Sair</BrowserLink>
      <BrowserLink to={'/modalDetalheTransação'} className='linkNav'>Detalhar Transação</BrowserLink>

    </div>
  )
}

export default navBar;