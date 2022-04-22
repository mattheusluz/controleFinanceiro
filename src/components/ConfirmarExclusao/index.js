import './style.css';
import { useContext } from 'react';
import UserContext from '../../contexts/userContext';

function ConfirmarExclusao() {

  const {
    todasTransacoes,
    setExcluir,
    idTransacao
  } = useContext(UserContext);

  const deletarTransacao = async (id) => {
    try {
      await fetch(`https://sistemacontrolefinanceiro.herokuapp.com/transacoes/${id}`, {
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
    <div className="paginaModal">
      <div className='container-confirm-delete'>
        <span>Apagar item?</span>
        <div className="selectButton">
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
      </div>
    </div>
  )
}

export default ConfirmarExclusao;