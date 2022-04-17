import { useContext } from 'react';
import filtro from '../../assets/filtro.svg';
import Filtros from '../../components/Filtros';
import Header from '../../components/Header';
import ListaTransacoes from '../../components/ListaTransacoes';
import ModalTransacoes from '../../components/ModalTransacoes';
import Resumo from '../../components/Resumo';
import UserContext from '../../contexts/userContext';
import '../../globalStyles/styles.css';
import './style.css';

function Main() {
  const {
    openModal,
    setOpenModal,
    transacoes,
    setFiltrados,
    setFiltrando,
    hidden,
    setHidden,
  } = useContext(UserContext);

  const esconderFiltros = () => {
    return hidden ? setHidden(false) : setHidden(true);
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
        </div>
        <div className="asideMain">
          <ListaTransacoes />
        </div>
      </section>
      {
        openModal && <ModalTransacoes />
      }
    </div>
  );
}

export default Main;
