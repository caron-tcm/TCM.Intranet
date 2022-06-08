import IServidor from "@interfaces/IServidor"
import { DataGrid } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import { ColumnCellTemplateData } from "devextreme/ui/data_grid"
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import estilos from './consultas.module.scss';
import 'devextreme/dist/css/dx.light.css';

export default function renderPesquisaRamal(ramais: IServidor[], nomePesquisado: string | null) : JSX.Element {

    //----- renders das colunas customizadas

    const renderRamal = (data:ColumnCellTemplateData) => {

        if (data.value) {
            return data.value == "1349" // estava no código original, eu mantive :))
                ? <a href="https://wa.me/551150801349" title={`Clique para mandar mensagem por whastapp para ${data.data["Nome"]}`} target="_blank" rel="noreferrer"><FaWhatsapp size={15} />{data.value}</a>
                : <a href={`tel:+55 11 5080-0${data.value}`} title={`Clique para ligar para ${data.data["Nome"]}`}><FaPhoneAlt size={10} />{data.value}</a>
        } else {
            return ""
        }
    }

    const renderNome = (data: ColumnCellTemplateData ) => {
       
        if (nomePesquisado) {
            let nomePequisado = String(nomePesquisado).toUpperCase()
            let nomeDestacado = String(data.data["Nome"]).toUpperCase().replace(nomePequisado,`<strong>${nomePequisado}</strong>`)
            return <span dangerouslySetInnerHTML={{__html: nomeDestacado}}></span>
        } else {
            return data.value
        }
    }

    const renderEmail = (data:ColumnCellTemplateData) => {

        return data.value
            ? <a href={`mailto:${data.value}`} title={`Clique para enviar um e-mail para ${data.data["Nome"]}`}><FaEnvelope size={10}/> {data.value}</a>
            : ""
    }

    const renderArea = (data: ColumnCellTemplateData) => {
        return <span className={estilos.colunaArea}>{data.value}</span>
    }

    const renderCargo = (data: ColumnCellTemplateData) => {
        return <span className={estilos.colunaCargo}>{data.value}</span>
    }

    //------- monta e retorna o resultado da pesquisa

    return (
    <div>
        <br />

        <DataGrid
            dataSource={ramais}
            keyExpr="Chapa"
            rowAlternationEnabled={true}
            allowColumnResizing={true}
            columnAutoWidth={true}
            wordWrapEnabled={true}>
                <Column dataField="Ramal" cellRender={renderRamal} width={80} alignment={"center"}/>
                <Column dataField="Nome" cellRender={renderNome} minWidth={250}/>
                <Column dataField="Chapa" />
                <Column dataField="Email" cellRender={renderEmail} width={200}/>
                <Column dataField="Lotacao.mNome" cellRender={renderArea} caption="Área" />
                <Column dataField="Cargo" cellRender={renderCargo}/>
        </DataGrid>

    </div>
    )
   
}
