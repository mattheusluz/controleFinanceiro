import { useEffect, useState } from 'react';
import CloseIcon from '../../assets/closeBtn.svg';
import InputMask from 'react-input-mask';
import './style.css';

export default function ModalTransacoes({ openModal, handleClose, editando, idTransacao, transacao, transacaoEditada }) {

  const [credito, setCredito] = useState(false);
  const [debito, setDebito] = useState(true);
  const [valor, setValor] = useState();
  const [categoria, setCategoria] = useState();
  const [data, setData] = useState('05/12/2021');
  const [descricao, setDescricao] = useState();
  const [diaSemana, setDiaSemana] = useState();

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
      setData(transacaoEditada.date);
      setValor(transacaoEditada.value / 100);
      setCategoria(transacaoEditada.category);
      setDescricao(transacaoEditada.description);
      if (transacaoEditada.type === 'credit') {
        setCredito(true);
        setDebito(false);
      } else {
        setCredito(false);
        setDebito(true);
      }
    }
  }, [transacaoEditada]);

  const inserirTransacao = async (id) => {
    try {
      const dadosBody = {
        date: data,
        week_day: diaSemana,
        description: descricao,
        value: valor * 100,
        category: categoria,
        type: credito ? 'credit' : 'debit'
      };

      if (!editando) {
        const resposta = await fetch('http://localhost:3333/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosBody),
        });

        const dados = await resposta.json();
      } else {
        const resposta = await fetch(`http://localhost:3333/transactions/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosBody),
        });

        const dados = await resposta.json();
      }
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
      debitoAtivo = transacaoEditando[0].type === 'debit' ? 'debito' : '';
      creditoAtivo = transacaoEditando[0].type === 'credit' ? 'credito' : '';
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

        <form>
          <div>
            <label htmlFor='value'>Valor
              <input
                onChange={(e) => setValor(e.target.value)}
                value={valor}
                name='value'
                id='imputValue'
                title='Valor da transação em reais'
                type='number'
                placeholder='99,99'
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor='category'>Categoria
              <input
                onChange={(e) => setCategoria(e.target.value)}
                value={categoria}
                name='category'
                id='imputCategory'
                title='Categoria da transação'
                placeholder='Mercado'
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor='date'>Data
              {<InputMask
                mask="99/99/9999"
                onChange={(e) => setData(e.target.value)}
                value={data}
                name="date"
                id="imputDate"
                title='Data da transação'
                required
              />}
            </label>
          </div>
          <div>
            <label htmlFor='description'>Descrição
              <input
                onChange={(e) => setDescricao(e.target.value)}
                value={descricao}
                name="description"
                id="imputDescription"
                title='Descrição da transação'
                placeholder='Compra de comida'
                required
              />
            </label>
          </div>
          <div className="container-btn-insert">
            <button className='btn-insert' onClick={() => inserirTransacao(idTransacao)}>Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  )
}