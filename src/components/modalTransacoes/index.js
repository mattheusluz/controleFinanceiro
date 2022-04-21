import { useContext, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import CloseIcon from '../../assets/closeBtn.svg';
import UserContext from '../../contexts/userContext';
import './style.css';

export default function ModalTransacoes() {

  const {
    todasTransacoes,
    idTransacao,
    openModal,
    setOpenModal,
    transacaoEditada,
    setTransacaoEditada,
    editar,
    setEditar
  } = useContext(UserContext);

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
  }, [diaFormatado])

  useEffect(() => {
    if (transacaoEditada) {
      const dataEdicao = `${transacaoEditada.data.substr(8, 2)}/${transacaoEditada.data.substr(5, 2)}/${transacaoEditada.data.substr(0, 4)}`
      setData(dataEdicao);
      setValor(transacaoEditada.valor / 100);
      setCategoria(transacaoEditada.categoria);
      setDescricao(transacaoEditada.descricao);
      if (transacaoEditada.tipo) {
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

      if (!editar) {
        const resposta = await fetch('https://sistemacontrolefinanceiro.herokuapp.com/transacoes', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
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
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
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
      todasTransacoes()
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

  const handleClose = () => {
    openModal ? setOpenModal(false) : setOpenModal(true);
    setEditar(false);
    setTransacaoEditada(null);
  }

  return (
    <div className="backdrop">
      <div className="modal-containerTransacao">
        <img
          className="close-icon"
          src={CloseIcon}
          alt="Close icon"
          onClick={() => handleClose()}
        />

        <h2>{editar ? 'Editar' : 'Adicionar'} Registro</h2>
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
                placeholder='RS 00,00'
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
                placeholder='EX: Mercado'
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
                placeholder='MM/DD/AAAA'
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
                placeholder='Ex: Compra de comida'
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