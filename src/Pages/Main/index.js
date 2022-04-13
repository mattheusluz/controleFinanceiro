import { useEffect, useState, useContext } from 'react';
import './style.css';
import '../../globalStyles/styles.css';
import filtro from '../../assets/filtro.svg';
import ModalTransacoes from '../../components/ModalTransacoes';
import ListaTransacoes from '../../components/ListaTransacoes';
import Filtros from '../../components/Filtros';
import Header from '../../components/Header';
import Resumo from '../../components/Resumo';
import UserContext from '../../contexts/userContext';
import ConfirmarEscolha from '../../components/ConfirmarEscolha';
import { format } from 'date-fns';

function Main() {
  const {
    transacoes,
    setTransacoes,
    setFiltrados,
    setFiltrando,
    hidden,
    setHidden,
  } = useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);
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
    // todasTransacoes();
    setTransacaoEditada(transacao);
  }

  const handleClose = () => {
    openModal ? setOpenModal(false) : setOpenModal(true);
    setEditar(false);
  }

  const handlePopUp = () => {
    setPopup(!popup);
  }
  return (
    <div className="Main">
      <Header />
      <section className='main'>
        <span className='open-filters-button' onClick={() => esconderFiltros()}>
          <img src={filtro} alt="Filtro" />
          Filtrar
        </span>
          <Resumo
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        <div className="filters-table-resume">
          <Filtros
            setFiltrando={setFiltrando}
            transacoes={transacoes}
            setFiltrados={setFiltrados}
            hidden={hidden}
          />
        <div className="asideMain">
          <ListaTransacoes />
          <ConfirmarEscolha />
        </div>
      </div>
      </section>
        <ModalTransacoes
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleClose={handleClose}
          editando={editar}
          idTransacao={idTransacao}
          transacao={transacoes}
          transacaoEditada={transacaoEditada}
        />
    </div>
  );
}

export default Main;
