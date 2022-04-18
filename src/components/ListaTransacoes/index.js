import { useContext } from 'react';
import lapis from '../../assets/lapis.svg';
import lixeira from '../../assets/lixeira.svg';
import UserContext from '../../contexts/userContext';
import ConfirmarExclusao from '../ConfirmarExclusao';
import './style.css';

function ListaTransacoes() {
  const {
    transacoes,
    setOpenModal,
    setEditar,
    filtrando,
    filtrados,
    excluir,
    setExcluir,
    setIdTransacao,
    setTransacaoEditada
  } = useContext(UserContext);

  const editarTransacao = (transacao) => {
    setOpenModal(true);
    setEditar(true);
    setIdTransacao(transacao.id);
    setTransacaoEditada(transacao);
  }

  return (
    <table className='table'>
      <th className='table-head'>
        <div id='date' className='column-title date'>
          <span>Data</span>
        </div>
        <div id='week-day' className='column-title day'>
          <span>Dia da Semana</span>
        </div>
        <div className='column-title'>
          <span>Categoria</span>
        </div>
        <div className='column-title description'>
          <span>Descrição</span>
        </div>
        <div id='value' className='column-title value'>
          <span>Valor</span>
        </div>
        <div id='editDelete' className='editDelete'>
          .
        </div>
      </th>
      {(filtrando ? filtrados : transacoes && transacoes).map((transacao) => (
        <tbody className='table-body' key={transacao.id} >
          <tr className='table-line'>
            <td className='date line-items'>
              <span>{`
              ${transacao.data.substr(8, 2)}/
              ${transacao.data.substr(5, 2)}/
              ${transacao.data.substr(0, 4)}
              `}</span>
            </td>
            <td className='day line-items'>
              <span className='day'>{transacao.dia_semana}</span>
            </td>
            <td className='line-items category'>
              <span>{transacao.categoria}</span>
            </td>
            <td className='line-items description'>
              <span>{transacao.descricao}</span>
            </td>
            <td
              className='line-items'
              style={{ color: transacao.tipo ? '#7B61FF' : '#FA8C10' }}
            >
              <span>{!transacao.tipo && '-'} R$ {transacao.valor / 100}</span>
            </td>
            <td className='editDele'>
              <img
                src={lapis}
                alt="Editar"
                className='edit-icon'
                onClick={() => editarTransacao(transacao)} />
              <img
                src={lixeira}
                alt="Deletar"
                className='delete-icon'
                onClick={() => {
                  setExcluir(true)
                  setIdTransacao(transacao.id)
                }}
              />
              {excluir && <ConfirmarExclusao />}
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  )
}

export default ListaTransacoes;