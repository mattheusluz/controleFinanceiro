import './style.css';
import { NavLink } from "react-router-dom";

function navBar(){
  return(
    <div className='navBar'>
      <NavLink to={'/'} className='navLink'>Sair</NavLink>
    </div>
  )
}

export default navBar;