import { useContext } from 'react';
import filtro from '../../assets/filtro.svg';
import Filtros from '../../components/Filtros';
import Header from '../../components/Header';
import ListaTransacoes from '../../components/ListaTransacoes';
import ModalTransacoes from '../../components/ModalTransacoes';
import ModalEditarUsuario from '../../components/ModalEditarUsuario';
import Resumo from '../../components/Resumo';
import Footer from '../../components/Footer';
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
    setTransacoes
  } = useContext(UserContext);

  const esconderFiltros = () => {
    return hidden ? setHidden(false) : setHidden(true);
  }

  function handleOrderTransactions(newTransactions){
    setTransacoes(newTransactions);
  }

  return (
    <div className="Main">
      <Header />
      <ModalEditarUsuario />
      <section className='main'>
        <div className="buttonFilter">
        <span className='open-filters-button' onClick={() => esconderFiltros()}>
          <img src={filtro} alt="Filtro" />
          Filtrar
        </span>
        </div>
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
        {/* <div className="asideMain"> */}
          <ListaTransacoes 
          transacoes = {transacoes}
          handleOrderTransactions={handleOrderTransactions}/>
        {/* </div> */}
      {
        openModal && <ModalTransacoes />
      }
      </section>
    <Footer 
    className='footer'
    />
    </div>
  );
}

export default Main;
