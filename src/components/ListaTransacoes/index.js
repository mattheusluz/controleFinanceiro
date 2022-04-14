import './style.css';
import UserContext from '../../contexts/userContext';
import { useContext, useEffect } from 'react';
import lapis from '../../assets/lapis.svg';
import lixeira from '../../assets/lixeira.svg';
import { format } from 'date-fns';

function ListaTransacoes() {
  const { transacoes, setTransacoes, filtrando, filtrados, setFiltrados } = useContext(UserContext);

  const todasTransacoes = async () => {
    try {
      const resposta = await fetch('https://sistemacontrolefinanceiro.herokuapp.com/transacoes', {
        method: 'GET',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5NTEyNDAyfQ.vKMxjFCSoC3NEvQrJ4Pge6TQcIt-dtPBjgTRe5v-OLs`,
          'Content-Type': 'application/json',
        },
      });

      const data = await resposta.json();
      setTransacoes(data);
      setFiltrados(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    todasTransacoes();
  }, []);

  // const editarTransacao = (transacao) => {
  //   handleModal();
  //   setEditar(true);
  //   setIdTransacao(transacao.id);
  //   todasTransacoes();
  //   setTransacaoEditada(transacao);
  // }

  return (
    <table className='table'>
      <th className='table-head'>
        <div id='date' className='column-title date'>
          <span>Data</span>
        </div>
        <div id='week-day' className='column-title day'>
          <span>Dia da semana</span>
        </div>
        <div className='column-title category'>
          <span>Categoria</span>
        </div>
        <div className='column-title description'>
          <span>Descrição</span>
        </div>
        <div id='value' className='column-title value'>
          <span>Valor</span>
        </div>
        <div id='editDelete' className='editDelete'>
          <span>editar</span>
        </div>
      </th>
      {(filtrando ? filtrados : transacoes && transacoes).map((transacao) => (
        <tbody className='table-body' key={transacao.id} >
          <tr className='table-line'>
            <td className='date line-items'>{format(new Date(transacao.data), 'dd/MM/yyy')}</td>
            <td className='day line-items'>{transacao.dia_semana}</td>
            <td className='category line-items '>{transacao.categoria}</td>
            <td className='elipsis line-items description'>{transacao.descricao}</td>
            <td
              className='line-items'
              style={{ color: transacao.tipo ? '#7B61FF' : '#FA8C10' }}
            >
              {!transacao.tipo && '-'} R$ {transacao.valor / 100}
            </td>
            <td className='editDelete'>
              <img src={lapis} alt="Editar" className='edit-icon'/*  onClick={() => editarTransacao(transacao)} */ />
              <img src={lixeira}
                alt="Deletar"
                className='delete-icon'
              // onClick={() => {
                //   handlePopUp()
              //   setIdTransacao(transacao.id)
              // }}
              />
            </td>
          {/* <ConfirmarEscolha /> */}
          </tr>
        </tbody>
      ))}
    </table>
  )
}

export default ListaTransacoes;