import './style.css';
import { useEffect, useState } from 'react';

function Resumo(){
  const [popup, setPopup] = useState(false);
  const [idTransacao, setIdTransacao] = useState();
  const [filtrados, setFiltrados] = useState([]);
  const [transacoes, setTransacoes] = useState([]);

  const handlePopUp = () => {
    setPopup(!popup);
  }

  const todasTransacoes = async () => {
    try {
      const resposta = await fetch('http://localhost:3333/transactions', {
        method: 'GET'
      });

      const data = await resposta.json();

      setTransacoes(data);
      setFiltrados(data);
    } catch (error) {
      console.log(error);
    }
  }

  const deletarTransacao = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:3333/transactions/${id}`, {
        method: 'DELETE'
      });
      todasTransacoes();
    } catch (error) {
      console.log(error);
    }
    handlePopUp();
  }

  return(
    <div className='container-confirm-delete' style={{ display: !popup && 'none' }}>
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
        onClick={() => handlePopUp()}
      >
        Não
      </button>
    </div>
  )
}

export default Resumo;