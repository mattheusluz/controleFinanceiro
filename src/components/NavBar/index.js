import React from 'react';
import arrowDown from '../../assets/arrowDown.svg';
import arrowUp from '../../assets/arrowUp.png';
import { useContext,
  useState,
  useEffect
} from 'react';
import UserContext from '../../contexts/userContext';
import ModalUsuario from '../NavBar/ModalUsuario';
import './style.css';


function NavBar() {
  // const nomeUsuario = {
  //   nome: ""
  // };

  const {
    popup,
    setPopup,
    token
  } = useContext(UserContext);

  const [dadosUsuario, setDadosUsuario] = useState([]);
  
  async function handleDadosUsuario() {
    try {
      const response = await fetch(
        'https://sistemacontrolefinanceiro.herokuapp.com/usuarios',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token ? token : window.localStorage.getItem("token")
              }`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setDadosUsuario(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    function carregarDadosUsuario() {
      setDadosUsuario({
        nome: dadosUsuario.nome
      });
    }
    carregarDadosUsuario();
  },[]);
  
  useEffect(() => {
    handleDadosUsuario();
  }, [])

  return (
    <div className='navBar'>
      <div className="tituloMenu">
        <h1 className='nome'>Olá, {dadosUsuario && dadosUsuario.nome}</h1>
        
      </div>
      <div className="displayMenu">
        {popup
          ? <img className='imgModal'
          src={arrowUp}
            alt='Menu fechado'
            onClick={() => setPopup(false)}
          />
          : <img className='imgModal'
            src={arrowDown}
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