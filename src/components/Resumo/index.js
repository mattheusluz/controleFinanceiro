import './style.css';
import { useEffect, useState } from 'react';

function TabelaTransacoes(){
  const [openModal, setOpenModal] = useState(false);
  const [editar, setEditar] = useState(false);
  const [transacaoEditada, setTransacaoEditada] = useState(false);
  const [filtrados, setFiltrados] = useState([]);
  const [filtrando, setFiltrando] = useState(false);
  const [transacoes, setTransacoes] = useState([]);

  const handleModal = () => {
    setEditar(false);
    setTransacaoEditada(false);
    openModal ? setOpenModal(false) : setOpenModal(true);
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
  return(
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
  )
}

export default TabelaTransacoes;