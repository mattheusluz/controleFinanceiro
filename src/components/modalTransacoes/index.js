import { useEffect, useState } from 'react';
import CloseIcon from '../../assets/closeBtn.svg';
import InputMask from 'react-input-mask';
import './style.css';

export default function ModalTransacoes({ openModal, setOpenModal, handleClose, editando, idTransacao, transacao, transacaoEditada }) {

  const [credito, setCredito] = useState(false);
  const [debito, setDebito] = useState(true);
  const [valor, setValor] = useState();
  const [categoria, setCategoria] = useState();
  const [data, setData] = useState('05/12/2021');
  const [descricao, setDescricao] = useState();
  const [diaSemana, setDiaSemana] = useState();
  const [erroTransacao, setErroTransacao] = useState(null);

  const formataDiaSemana = new Date(data.toString().substr(6, 4) + '/' + data.toString().substr(3, 2) + '/' + data.toString().substr(0, 2)).getDay();

  let diaFormatado = '';

  if (formataDiaSemana === 0) diaFormatado = 'Domingo';
  if (formataDiaSemana === 1) diaFormatado = 'Segunda';
  if (formataDiaSemana === 2) diaFormatado = 'Terça';
  if (formataDiaSemana === 3) diaFormatado = 'Quarta';
  if (formataDiaSemana === 4) diaFormatado = 'Quinta';
  if (formataDiaSemana === 5) diaFormatado = 'Sexta';
  if (formataDiaSemana === 6) diaFormatado = 'Sábado';

  useEffect(() => {
    setDiaSemana(diaFormatado);
  }, [data])

  useEffect(() => {
    if (transacaoEditada) {
      setData(transacaoEditada.data);
      setValor(transacaoEditada.valor / 100);
      setCategoria(transacaoEditada.categoria);
      setDescricao(transacaoEditada.descricao);
      if (transacaoEditada.type) {
        setCredito(true);
        setDebito(false);
      } else {
        setCredito(false);
        setDebito(true);
      }
    }
  }, [transacaoEditada]);

  const inserirTransacao = async (id) => {
    setErroTransacao(null);

    try {
      const dadosBody = {
        data,
        dia_semana: diaSemana,
        descricao,
        valor: valor * 100,
        categoria,
        tipo: credito ? true : false
      };

      if (!editando) {
        const resposta = await fetch('https://sistemacontrolefinanceiro.herokuapp.com/transacoes', {
          method: 'POST',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5NTEyNDAyfQ.vKMxjFCSoC3NEvQrJ4Pge6TQcIt-dtPBjgTRe5v-OLs`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosBody),
        });

        const dados = await resposta.json();

        if (dados.erro) {
          setErroTransacao(dados.erro);
          return;
        }
      } else {
        const resposta = await fetch(`https://sistemacontrolefinanceiro.herokuapp.com/transacoes/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5NTEyNDAyfQ.vKMxjFCSoC3NEvQrJ4Pge6TQcIt-dtPBjgTRe5v-OLs`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosBody),
        });

        const dados = await resposta.json();

        if (dados.erro) {
          setErroTransacao(dados.erro);
          return;
        }
      }
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCredito = () => {
    setCredito(true);
    setDebito(false)
  }

  const handleDebito = () => {
    setDebito(true)
    setCredito(false);
  }

  let debitoAtivo = '';
  let creditoAtivo = '';
  if (transacao) {
    const transacaoEditando = transacao.filter(item => item.id === idTransacao);
    if (transacaoEditando.length > 0) {
      debitoAtivo = !transacaoEditando[0].tipo ? 'debito' : '';
      creditoAtivo = transacaoEditando[0].tipo ? 'credito' : '';
    }
  }

  return (
    <div className="backdrop" style={{ display: !openModal && 'none' }}>
      <div className="modal-container">
        <img
          className="close-icon"
          src={CloseIcon}
          alt="Close icon"
          onClick={() => handleClose()}
        />

        <h2>{editando ? 'Editar' : 'Adicionar'} Registro</h2>
        <div className="container-buttons">
          <button
            id="credit-button"
            className={`btn-new-transaction ${credito && 'credito'}`}
            onClick={() => handleCredito()}>
            Entrada
          </button>

          <button
            id="debit-button"
            className={`btn-new-transaction ${debito && 'debito'}`}
            onClick={() => handleDebito()}>
            Saída
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault()
          inserirTransacao(idTransacao)
        }
        }>
          <div>
            <label htmlFor='value'>
              Valor
              <input
                onChange={(e) => setValor(e.target.value)}
                value={valor}
                name='value'
                id='imputValue'
                title='Valor da transação em reais'
                type='number'
                placeholder='99,99'
                className={
                  erroTransacao
                  && erroTransacao.includes('valor')
                  && 'erroInput'
                }
              />
              {
                erroTransacao
                && erroTransacao.includes('valor')
                && <span className='spanErro'>
                  digite um valor em reais
                </span>
              }
            </label>
          </div>
          <div>
            <label htmlFor='category'>
              Categoria
              <input
                onChange={(e) => setCategoria(e.target.value)}
                value={categoria}
                name='category'
                id='imputCategory'
                title='Categoria da transação'
                placeholder='Mercado'
                className={
                  erroTransacao
                  && erroTransacao.includes('categoria')
                  && 'erroInput'}
              />
              {
                erroTransacao
                && erroTransacao.includes('categoria')
                && <span className='spanErro'>
                  {erroTransacao}
                </span>
              }
            </label>
          </div>
          <div>
            <label htmlFor='date'>
              Data
              {<InputMask
                mask="99/99/9999"
                onChange={(e) => setData(e.target.value)}
                value={data}
                name="date"
                id="imputDate"
                title='Data da transação'
                className={
                  erroTransacao
                  && erroTransacao.includes('data')
                  && 'erroInput'}
              />}
              {
                erroTransacao
                && erroTransacao.includes('data')
                && <span className='spanErro'>
                  {erroTransacao}
                </span>
              }
            </label>
          </div>
          <div>
            <label htmlFor='description'>
              Descrição
              <input
                onChange={(e) => setDescricao(e.target.value)}
                value={descricao}
                name="description"
                id="imputDescription"
                title='Descrição da transação'
                placeholder='Compra de comida'
                className={
                  erroTransacao
                  && erroTransacao.includes('descricao')
                  && 'erroInput'}
              />
              {
                erroTransacao
                && erroTransacao.includes('descricao')
                && <span className='spanErro'>
                  {erroTransacao}
                </span>
              }
            </label>
          </div>
          <div className="container-btn-insert">
            <button className='btn-insert' type='submit'>
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div >
  )
}