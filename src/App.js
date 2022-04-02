import { useEffect, useState } from 'react';
import './App.css';
import logoDindin from './assets/logoDindin.svg';
import filtro from './assets/filtro.svg';
import lapis from './assets/lapis.svg';
import lixeira from './assets/lixeira.svg';
import ModalTransacoes from './components/modalTransacoes';
import Filtros from './components/filtros';

function App() {
  const [hidden, setHidden] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [transacoes, setTransacoes] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [filtrando, setFiltrando] = useState(false);
  const [editar, setEditar] = useState(false);
  const [transacaoEditada, setTransacaoEditada] = useState(false);
  const [idTransacao, setIdTransacao] = useState();
  const [popup, setPopup] = useState(false);

  const esconderFiltros = () => {
    return hidden ? setHidden(false) : setHidden(true);
  }

  const handleModal = () => {
    setEditar(false);
    setTransacaoEditada(false);
    openModal ? setOpenModal(false) : setOpenModal(true);
  }

  const editarTransacao = (transacao) => {
    handleModal();
    setEditar(true);
    setIdTransacao(transacao.id);
    todasTransacoes();
    setTransacaoEditada(transacao);
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

  const handleClose = () => {
    openModal ? setOpenModal(false) : setOpenModal(true);
    setEditar(false);
  }

  useEffect(() => {
    todasTransacoes();
  }, []);

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

  const calcularEntradas = () => {
    let soma = 0;

    (filtrando ? filtrados : transacoes).map(transacao => {
      if (transacao.type === 'credit') soma += transacao.value;
    });

    const valorEmReais = `${soma / 100}`;
    let valorComPonto = '';

    if (valorEmReais.indexOf(".") === -1) {
      valorComPonto = valorEmReais + ',00';
      const valorComVirgula = valorComPonto.replace('.', ',');
      return `${valorComVirgula}`;
    }

    return `${valorEmReais.replace('.', ',')}`;
  }

  const calcularSaidas = () => {
    let soma = 0;

    (filtrando ? filtrados : transacoes).map(transacao => {
      if (transacao.type === 'debit') {
        soma += transacao.value;
      }
    });

    const valorEmReais = `${soma / 100}`;
    let valorComPonto = '';

    if (valorEmReais.indexOf(".") === -1) {
      valorComPonto = valorEmReais + '.00';
      const valorComVirgula = valorComPonto.replace('.', ',');
      return `${valorComVirgula}`;
    }

    return `${valorEmReais.replace(".", ",")}`;
  }

  const calcularValorTotal = () => {
    const entradas = Number(calcularEntradas().replace(',', '.'));
    const saidas = Number(calcularSaidas().replace(',', '.'));

    const total = `${entradas - saidas}`;

    let valorComPonto = '';

    if (total.indexOf(".") === -1) {
      valorComPonto = total + '.00';
      const valorComVirgula = valorComPonto.replace('.', ',');
      return `${valorComVirgula}`;
    }

    return `${total.replace('.', ',')}`;
  }

  const handlePopUp = () => {
    setPopup(!popup);
  }

  return (
    <div className="App">
      <header className='container-header'>
        <img src={logoDindin} alt="Logo Dindin" className='logo' />
        <h1 className='titulo'>Dindin</h1>
      </header>
      <section className='main'>
        <span className='open-filters-button' onClick={() => esconderFiltros()}>
          <img src={filtro} alt="Filtro" />
          Filtrar
        </span>
        <div className="filters-table-resume">
          <div className="filters-table">
            <Filtros
              setFiltrando={setFiltrando}
              transacoes={transacoes}
              setFiltrados={setFiltrados}
              hidden={hidden}
            />
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
              {(filtrando ? filtrados : transacoes).map((transacao) => (
                <ul className='table-body' key={transacao.id}>
                  <li className='table-line'>
                    <span className='line-items'>{transacao.date}</span>
                    <span className='line-items'>{transacao.week_day}</span>
                    <span className='line-items'>{transacao.description}</span>
                    <span className='line-items'>{transacao.category}</span>
                    <span
                      className='line-items'
                      style={{ color: transacao.type === 'credit' ? '#7B61FF' : '#FA8C10' }}
                    >
                      {transacao.type === 'debit' && '-'} R$ {transacao.value / 100}
                    </span>
                    <img src={lapis} alt="Editar" className='edit-icon' onClick={() => editarTransacao(transacao)} />
                    <img src={lixeira}
                      alt="Deletar"
                      className='delete-icon'
                      onClick={() => {
                        handlePopUp()
                        setIdTransacao(transacao.id)
                      }}
                    />
                  </li>
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
                </ul>
              ))}

            </div>
          </div>
          <div className="container-resume">
            <h3>Resumo</h3>
            <div >
              <span>Entradas</span>
              <strong className="entradas">R$ {calcularEntradas()}</strong>
            </div>
            <div >
              <span>Saídas</span>
              <strong className="saidas">R$ {calcularSaidas()}</strong>
            </div>
            <div>
              <strong>Saldo</strong>
              <strong className="saldo">R$ {calcularValorTotal()}</strong>
            </div>
            <button
              className="btn-add"
              onClick={handleModal}
            >
              Adicionar Registro
            </button>
          </div>
        </div>
      </section>
      <ModalTransacoes
        openModal={openModal}
        handleClose={handleClose}
        editando={editar}
        idTransacao={idTransacao}
        transacao={transacoes}
        transacaoEditada={transacaoEditada}
      />
    </div>
  );
}

export default App;
