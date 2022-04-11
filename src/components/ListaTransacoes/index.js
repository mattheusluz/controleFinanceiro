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
    <>
      <div className='table'>
        <div className='table-head'>
          <div id='date' className='column-title'>
            <span>Data</span>
          </div>
          <div id='week-day' className='column-title'>
            <span>Dia da semana</span>
          </div>
          <div className='column-title'>
            <span>Descrição</span>
          </div>
          <div className='column-title'>
            <span>Categoria</span>
          </div>
          <div id='value' className='column-title'>
            <span>Valor</span>
          </div>
        </div>
        {(filtrando ? filtrados : transacoes && transacoes).map((transacao) => (
          < ul className='table-body' key={transacao.id} >
            <li className='table-line'>
              <span className='line-items'>{format(new Date(transacao.data), 'dd/MM/yyy')}</span>
              <span className='line-items'>{transacao.dia_semana}</span>
              <span className='line-items'>{transacao.descricao}</span>
              <span className='line-items'>{transacao.categoria}</span>
              <span
                className='line-items'
                style={{ color: transacao.tipo ? '#7B61FF' : '#FA8C10' }}
              >
                {!transacao.tipo && '-'} R$ {transacao.valor / 100}
              </span>
              <img src={lapis} alt="Editar" className='edit-icon'/*  onClick={() => editarTransacao(transacao)} */ />
              <img src={lixeira}
                alt="Deletar"
                className='delete-icon'
              // onClick={() => {
              //   handlePopUp()
              //   setIdTransacao(transacao.id)
              // }}
              />
            </li>
            {/* <ConfirmarEscolha /> */}
          </ul>
        ))}
      </div>
    </>
  )
}

export default ListaTransacoes;