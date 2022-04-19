import { format } from 'date-fns';
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
    console.log(transacao)
    setOpenModal(true);
    setEditar(true);
    setIdTransacao(transacao.id);
    setTransacaoEditada(transacao);
  }

  return (
    <table className='table'>
      <th className='table-head'>
        <div id='date' className='column-titleDate'>
          <span>Data</span>
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
        <div id='value' className='column-titleValue'>
          <span>Valor</span>
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
              <span className='column-lineCategory elipsis'>{transacao.categoria}</span>
            </td>
            <td className='line-items'>
              <span className='column-lineDescription elipsis'>{transacao.descricao}</span>
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
              {excluir && <ConfirmarExclusao />}
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  )
}

export default ListaTransacoes;