import { Hash53 } from '@util/Utilidades';
import estilos from './breadcrumb.module.scss'

type crumb = {href: string, title:string};

type params = { itens: crumb[], titulo?: string};

export default function Breadcrumb( {itens, titulo}: params ) {

  return (
    <div className={estilos.breadcrumb}>
      <ol>
          {itens.map( (item) => (
          <li key={Hash53(item.href + item.title)}>
          {item.href.length != 0 
            ? <a className={estilos.linkAcesso} href={item.href}>{item.title}</a>
            : <span>{item.title}</span>
          }
          </li>
          ))}
      </ol>
      {titulo && <span className={estilos.titulo}>{titulo}</span>}
    </div>
  )
}
