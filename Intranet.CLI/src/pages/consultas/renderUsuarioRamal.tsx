import estilos from './consultas.module.scss';
import IServidor from "@interfaces/IServidor";
import ICentroCusto from '@interfaces/ICentroCusto';

export default function renderUsuarioRamal(usuario: IServidor) : JSX.Element {

    return (
        <div id="div_atualizar" className="alert alert-info fade in alert-dismissible">
    
        <a href="#" className="close" data-dismiss="alert" aria-label="close">×</a>
        <strong>Confira os dados antes de atualizar!</strong>
        <br />
    
        <form method="post" id="fAtualizaOutroRamalUpdate">
    
            <input id="cpf_hidden" name="cpf_hidden" type="hidden" value={usuario.CPF} />
            <input id="dtNasc_hidden" name="dia_hidden" type="hidden" value={usuario.DataNascimento?.getDate()} />
    
            <div>
                <label htmlFor="lbl_nome" >Nome:</label>
                <p id="lbl_Nome">{usuario.Nome}</p>
            </div>
    
            <div>
                <label htmlFor="lbl_lotacao" >Lotação:</label>
                <p id="lbl_Lotacao">{usuario.CentroCusto?.mNome}</p>
            </div>
    
            <div>
                <label htmlFor="lbl_Cargo" >Cargo:</label>
                <p id="lbl_Cargo">{usuario.Cargo}</p>
            </div>
    
            <div>
                <label htmlFor="lbl_RamalAtual" >Ramal Atual:</label>
                <p id="lbl_RamalAtual">{usuario.Ramal}</p>
            </div>
    
            <div>
                <label htmlFor="novoRamal" >Novo Ramal:</label>
                <input id="novoRamal" type="text" name="novoRamal" size={20} maxLength={40} placeholder="Ramal" />
            </div>
    
            <div>
                <button type="submit" name="Submit"><i className=" glyphicon glyphicon-floppy-disk"></i> Atualizar</button>
            </div>
    
        </form>
    
    </div>
    )
    
 }
