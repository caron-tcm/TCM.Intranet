import estilos from './aniversarios.module.scss'
import IAniversariante from '@interfaces/IAniversariante';

type params = {
  aniversarios: IAniversariante[];
};

export default function Aniversarios( {aniversarios: pessoas}:params ) {

  let diaAtual = ""

  const resolverDia = (dia) => {
    if(dia!=diaAtual) {
      diaAtual=dia
      return <p className={estilos.diaSemana}>{diaAtual}</p>
    }
  }

  return (
      <div className={estilos.container}>
        {pessoas.length > 0
        ? <>
        <h3 className={estilos.titulo}>Aniversariantes:</h3>
          {pessoas.map( item => (
            <div key={item.chapa}>
              {resolverDia(item.diadasemana)}
              <p className={estilos.nome}>{item.nome}</p>
              <p className={estilos.setor}>{item.lotacao}</p>
            </div>
          ))}
          <p className={estilos.parabens}>P a r a b é n s&nbsp; !!!!</p>
          </>
        : <div className={estilos.mensagemCentralizada}>
            <p>Não há aniversariantes na data de hoje</p>
          </div>
        }
      </div>
  )

}
