import { useEffect, useState } from 'react';
import './App.css';
import './globalStyles/styles.css';
import filtro from './assets/filtro.svg';
import lapis from './assets/lapis.svg';
import lixeira from './assets/lixeira.svg';
import ModalTransacoes from './components/ModalTransacoes';
import Filtros from './components/Filtros';
import Header from './components/Header';
import Resumo from './components/Resumo';
import ConfirmarEscolha from './components/ConfirmarEscolha';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import CadastroConcluido from './Pages/Cadastro/CadastroConcluido';
import Main from './Pages/Main';
import Rotas from './roteador/Rotas'

function App() {
  // const [hidden, setHidden] = useState(true);
  // const [openModal, setOpenModal] = useState(false);
  // const [transacoes, setTransacoes] = useState([]);
  // const [filtrados, setFiltrados] = useState([]);
  // const [filtrando, setFiltrando] = useState(false);
  // const [editar, setEditar] = useState(false);
  // const [transacaoEditada, setTransacaoEditada] = useState(false);
  // const [idTransacao, setIdTransacao] = useState();
  // const [popup, setPopup] = useState(false);


  // const esconderFiltros = () => {
  //   return hidden ? setHidden(false) : setHidden(true);
  // }

  // const handleModal = () => {
  //   setEditar(false);
  //   setTransacaoEditada(false);
  //   openModal ? setOpenModal(false) : setOpenModal(true);
  // }

  // const editarTransacao = (transacao) => {
  //   handleModal();
  //   setEditar(true);
  //   setIdTransacao(transacao.id);
  //   todasTransacoes();
  //   setTransacaoEditada(transacao);
  // }

  // const handleClose = () => {
  //   openModal ? setOpenModal(false) : setOpenModal(true);
  //   setEditar(false);
  // }

  // useEffect(() => {
  //   todasTransacoes();
  // }, []);

  // const todasTransacoes = async () => {
  //   try {
  //     const resposta = await fetch('http://localhost:3333/transactions', {
  //       method: 'GET'
  //     });

  //     const data = await resposta.json();

  //     setTransacoes(data);
  //     setFiltrados(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const handlePopUp = () => {
  //   setPopup(!popup);
  // }
  return (
    <div className="App">
      <Rotas />
      {/* <Login />
      <Cadastro />
      <CadastroConcluido />
      <Main /> */}
      {/* <Header />
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
                <ConfirmarEscolha />
              </ul>
            ))}
            </div>
          </div>
          <Resumo />
        </div>
      </section>
      <ModalTransacoes
        openModal={openModal}
        handleClose={handleClose}
        editando={editar}
        idTransacao={idTransacao}
        transacao={transacoes}
        transacaoEditada={transacaoEditada}
      />*/}
    </div>
  );
}

export default App;
