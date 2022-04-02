import './style.css';
import { useState } from 'react';

function ButtonTransacoes(){
  const [openModal, setOpenModal] = useState(false);
  const [editar, setEditar] = useState(false);
  const [transacaoEditada, setTransacaoEditada] = useState(false);

  const handleModal = () => {
    setEditar(false);
    setTransacaoEditada(false);
    openModal ? setOpenModal(false) : setOpenModal(true);
  }
  
  return(
    <button
      className="btn-add"
      onClick={handleModal}
    >
      Adicionar Registro
    </button>
  )
}

export default ButtonTransacoes;