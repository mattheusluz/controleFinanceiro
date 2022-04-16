import './style.css';
import { useContext, useState } from 'react';
import UserContext from '../../contexts/userContext';

function ConfirmarExclusao() {
  const [popup, setPopup] = useState(false);
  const [filtrados, setFiltrados] = useState([]);
  const [transacoes, setTransacoes] = useState([]);

  const {
    todasTransacoes,
    setExcluir,
    idTransacao
  } = useContext(UserContext);

  // const handlePopUp = () => {
  //   setPopup(!popup);
  // }

  const deletarTransacao = async (id) => {
    try {
      const resposta = await fetch(`https://sistemacontrolefinanceiro.herokuapp.com/transacoes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },

      });
      todasTransacoes();
    } catch (error) {
      console.log(error);
    }
    setExcluir(false);
  }

  return (
    <div className='container-confirm-delete'>
      <div className="arrow-up">
      </div>
      <span>Apagar item?</span>
      <button
        className="btn-actions-confirm-delete sim"
        onClick={() => deletarTransacao(idTransacao)}
      >
        Sim
      </button>
      <button
        className="btn-actions-confirm-delete nao"
        onClick={() => setExcluir(false)}
      >
        Não
      </button>
    </div>
  )
}

export default ConfirmarExclusao;