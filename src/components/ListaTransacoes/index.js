import { useContext } from 'react';
import lapis from '../../assets/lapis.svg';
import lixeira from '../../assets/lixeira.svg';
import orderUp from '../../assets/orderUp.svg';
import orderDown from '../../assets/orderDown.svg';
import {orderColumnAsc, orderColumnDesc} from './utils';
import UserContext from '../../contexts/userContext';
import ConfirmarExclusao from '../ConfirmarExclusao';
import {
  capitalizarUpperCase
} from '../../utils/formatters';
import {useState, useEffect} from 'react';
import './style.css';

function ListaTransacoes({handleOrderTransactions}) {
  const {
    transacoes,
    setOpenModal,
    setEditar,
    filtrando,
    setFiltrando,
    filtrados,
    excluir,
    setExcluir,
    setIdTransacao,
    setTransacaoEditada,
    filter,
    setFilter,
    handleChangeFilter,
    order,
    setOrder
  } = useContext(UserContext);

  const editarTransacao = (transacao) => {
    setOpenModal(true);
    setEditar(true);
    setIdTransacao(transacao.id);
    setTransacaoEditada(transacao);
  }
  
  useEffect(() => {
      console.log(filter);
      console.log(order);
      console.log(filtrando);
      console.log(...filtrados);

      if(order === 'desc') {
        orderAllTransactionsByDesc();
        setFiltrando(true);
        return;
    }

    orderAllTransactionsByAsc();
    setFiltrando(false);
  },[filter, order]);

  function orderAllTransactionsByAsc() {
      const localTransactions = [...filtrados];

      localTransactions.sort((a, b) => orderColumnAsc(a, b, filter));

      handleOrderTransactions(localTransactions);
  }

  function orderAllTransactionsByDesc() {
      const localTransactions = [...filtrados];

      localTransactions.sort((a, b) => orderColumnDesc(a, b, filter));

      handleOrderTransactions(localTransactions);
  }

  return (
    <table className='table'>
      <th className='table-head'>
        <div id='date' className='column-titleDate'
        onClick={() => handleChangeFilter('date')}>
          <span>Data</span>
          {/* { filter === 'date' && */}
            <img 
              src={order === 'asc' ? orderUp : orderDown} 
              alt="apply filter" 
              onClick={()=>{}}
            />
           {/* } */}
        </div>
        <div id='week-day' className='column-titleDay elipsis'>
          <span>Dia da Semana</span>
        </div>
        <div className='column-titleCategory elipsis'>
          <span className='category'>Categoria</span>
        </div>
        <div className='column-titleDescription elipsis'>
          <span>Descrição</span>
        </div>
        <div 
        id='value' 
        className='column-titleValue'
        onClick={() => handleChangeFilter('date')}>
          <span>Valor</span>
          {/* { filter === 'value' && */}
            <img 
              src={order === 'asc' ? orderUp : orderDown} 
              alt="apply filter" 
            />
          {/* } */}
        </div>
        <div id='editDelete' className='column-titleEditDelete'>
          .
        </div>
      </th>
      {(filtrando ? filtrados : transacoes && transacoes).map((transacao) => (
        <tbody className='table-body' key={transacao.id} >
          <tr className='table-line'>
            <td className='line-items'>
              <span className='column-titleDate elipsis'>{`
              ${transacao.data.substr(8, 2)}/
              ${transacao.data.substr(5, 2)}/
              ${transacao.data.substr(0, 4)}
              `}</span>
            </td>
            <td className='line-items'>
              <span className='column-titleDay elipsis'>{transacao.dia_semana}</span>
            </td>
            <td className=' line-items'>
              <span className='column-lineCategory elipsis'>{capitalizarUpperCase(transacao.categoria)}</span>
            </td>
            <td className='line-items'>
              <span className='column-lineDescription elipsis'>{capitalizarUpperCase(transacao.descricao)}</span>
            </td>
            <td
              className='line-items'
              style={{ color: transacao.tipo ? '#7B61FF' : '#FA8C10' }}
            >
              <span className='column-titleValue'>{!transacao.tipo && '-'} R$ {transacao.valor / 100}</span>
            </td>
            <td className='editDele respoContainer'>
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
            </td>
              {excluir && <ConfirmarExclusao />}
          </tr>
        </tbody>
      ))}
    </table>
  )
}

export default ListaTransacoes;