import './style.css';
import github from '../../assets/gitHub.svg';
import linkedin from '../../assets/linkedin.svg';
import {Route, Redirect} from 'react-router-dom';

function Footer(){
  return(
    <footer className='containerFooter'>
      <h1>Produced by:</h1>
      <div className="authors">
        <div className="names border">
          <span>Jonas Adelino</span>
          <div className="linkHub">
          <a href="https://github.com/AdelinoJonas">
            <img src={github} alt="Jonas's gitHub link" />
          </a>
          <a href="https://www.linkedin.com/in/jonas-adelino-168830179/">
            <img src={linkedin} alt="Jonas's linkedin link" />
          </a>
          </div>
        </div>
        <div className="names">
          <span>Matheus Luz</span>
            <div className="linkHub">
            <a href="https://github.com/mattheusluz">
              <img 
              src={github} 
              alt="Matheus's gitHub link" 
              />
            </a>
            <a href="https://www.linkedin.com/in/mattheusluz/">
              <img src={linkedin} alt="Matheus's linkedin link"/>
            </a>
            </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;