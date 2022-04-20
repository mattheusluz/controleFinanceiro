import './style.css';
import github from '../../assets/gitHub.svg';
import linkedin from '../../assets/linkedin.svg';

function Footer(){
  return(
    <footer className='containerFooter'>
      <h1>Produced by:</h1>
      <div className="authors">
        <div className="jonas">
          <span>Jonas Adelino</span>
          <div className="linkHub">
            <img src={github} alt="Jonas's gitHub link" />
            <img src={linkedin} alt="Jonas's linkedin link" />
          </div>
        </div>
        <div className="matheus">
          <span>Matheus Luz</span>
            <div className="linkHub">
              <img src={github} alt="Matheus's gitHub link" />
              <img src={linkedin} alt="Matheus's linkedin link" />
            </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;