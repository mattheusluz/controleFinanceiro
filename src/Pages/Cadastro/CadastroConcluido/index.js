import './style.css';
import '../../../globalStyles/styles.css';
import Header from '../../../components/Header';
import cadastroConcluido from '../../../assets/icone-cadastro-concluido.svg';

function CadastroConcluido(){
  return(
    <>
    <Header className='header'/>
    <div className='page'>
      <div className="containerConcluido">
        <img src={cadastroConcluido} className='imgConcluido' alt="icone cadastro concluido" />
        <h1 className='titleConcluido'>Usuário cadastrado com sucesso</h1>
        <button type='submit' className='buttonEntrar'>Ir para Login</button>
      </div>
    </div>
    </>
  )
}

export default CadastroConcluido;