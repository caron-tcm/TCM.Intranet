import { FormEvent, ChangeEvent, useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { FaSearch } from 'react-icons/fa';
import add from 'date-fns/add'

// DX
import 'devextreme/dist/css/dx.light.css';
import { DateBox } from 'devextreme-react/date-box';
import { locale, loadMessages } from 'devextreme/localization/';
import TabPanel, { Item } from "devextreme-react/tab-panel";

// componentes
import { Breadcrumb, Header } from '@components/index';
import IServidor from '@interfaces/IServidor'
import estilos from './consultas.module.scss'

// renders
import renderUsuarioRamal from './renderUsuarioRamal'
import renderPesquisaRamal from './renderPesquisaRamal';

type CentroCusto = {
  CentroCusto: string;
  DescricaoCentroCusto: string;
}

export default function Consultas({ areas }:{areas:CentroCusto[]}) {
  
    const crumbs = [{href:"/",title:"Home"}, {href:"",title:"Consultas"}]

    const corporativo_URL = process.env.NEXT_PUBLIC_CORPORATIVO_API_URL
    const telefonesUteisURL = process.env.NEXT_PUBLIC_PORTAL_PUBLICACOES_URL + "113?showlayout=false&showTitle=false"

    const [usuarioRamal, setUsuarioRamal] = useState<IServidor | null>(null)
    const [erro, setErro] = useState<boolean>(false)
    const [pesquisaRamal, setPesquisaRamal] = useState<IServidor[] | null>(null)

    const [inputRamal, setInputRamal] = useState<string>("")
    const [inputNome, setInputNome] = useState<string>("")
    const [inputCodArea, setInputCodArea] = useState<string>("")
    const [msgCarregando, setMsgCarregando] = useState(true)

    //---- Inicialização

    useEffect(() => {  locale(navigator.language);  })

    //---- handle dos inputs

    const handleInputs = useCallback( (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        let campo = e.currentTarget.name;
        let valor = e.currentTarget.value;

        switch(campo)  {
            case 'ramal':
                setInputRamal(valor)
                break;
            case 'nome':
                setInputNome(valor)
                break;
            case 'codarea':
                setInputCodArea(valor)
                break;
            default:
                console.log("chave inesperada: " + campo)
        }

    }, []);


    //---- handle dos botões

    async function handlePesquisar(e: FormEvent) {

        e.preventDefault();

        let criterioPesquisa = ""
        let campo = ""
        let valor = ""

        switch (e.currentTarget.id) {

            case "pesquisar_Nome":
            
                criterioPesquisa = "/BuscaServidor/";
                campo ="nome"
                valor = inputNome
                break;

            case "pesquisar_Ramal" :

                criterioPesquisa = "/BuscaServidor/Ramal/";
                campo = "ramal"
                valor = inputRamal
                break;

            case "pesquisar_Area" :

                criterioPesquisa = "/BuscaServidor/Area/";
                campo = "codarea"
                valor = inputCodArea
                break;

            default: console.log("ERRO opção inexistente: " + e.currentTarget.id)
        }

        if (campo.length != 0) {

            let respAPI = await fetch(corporativo_URL + criterioPesquisa + valor);
            let itens: IServidor[] = await respAPI.json()
        
            itens = itens ? itens.filter( item => item.Ativo == true && +item.Chapa < 999900) : []
        
            setPesquisaRamal(itens)
        }

        if (campo !== "nome") setInputNome("")
        if (campo !== "ramal") setInputRamal("")
        if (campo !== "codarea") setInputCodArea("")

    }

    //---- monta e retorna o corpo do componente

  return (
  <>
    <Head>
      <title>
        Consultas - Intranet TCM
      </title>
    </Head>

    <Header />

    <Breadcrumb itens={crumbs} titulo={"Consultas"}/>


    {/*--- Tab navegação -----------------------------------------------*/}

    <TabPanel>

        {/*--- tab Consulta Ramais--------------------------------------*/}

        <Item title="Consulta Ramais" icon="Fa FaSearch">

            <h3>Consulta Ramais</h3>

            <form id="pesquisar_Nome" onSubmit={e => handlePesquisar(e)}>
                <fieldset>
                    <label htmlFor="Nome">Nome:</label>
                    <input id="nome" name="nome" type="text" placeholder="Informe algum Nome" value={inputNome} onChange={e => setInputNome(e.currentTarget.value)} />
                    <button type="submit"><FaSearch /></button>
                </fieldset>
            </form>

            <form id="pesquisar_Ramal" onSubmit={e => handlePesquisar(e)}>
                <fieldset>
                    <label htmlFor="ramal">Ramal:</label>
                    <input id="ramal" name="ramal" type="number" maxLength={4} placeholder="Informe um Ramal" min="0000" max="9999" value={inputRamal} onChange={e => setInputRamal(e.currentTarget.value)}/>
                    <button type="submit"><FaSearch /></button>
                </fieldset>
            </form>

            <form id="pesquisar_Area" onSubmit={e => handlePesquisar(e)}>
                <fieldset>
                    <label htmlFor="Codarea">Área:</label>
                    <select id="codarea" name="codarea" placeholder="Selecione" value={inputCodArea}  onChange={e => setInputCodArea(e.currentTarget.value)}>
                        <option value="">-------------- Selecione alguma área --------------</option>
                        <option value="0000">Todas as Áreas</option>
                        {areas && areas.map( item => <option value={item.CentroCusto} key={item.CentroCusto}>{item.DescricaoCentroCusto}</option>)}
                    </select>
                </fieldset>
                <button type="submit"><FaSearch /></button>
            </form>

            {pesquisaRamal && renderPesquisaRamal(pesquisaRamal, inputNome)}

        </Item>

        {/*--- tab Telefones úteis --------------------------------------*/}

        <Item title="Telefones Úteis" icon={"email"}>
            <h3>{msgCarregando ? "Carregando..." : "Telefones Úteis"}</h3>
            {<iframe src={telefonesUteisURL} width="100%" frameBorder="0" scrolling="no" height="1500px" onLoad={() => setMsgCarregando(false)}></iframe>}
        </Item>

        {/*--- tab Atualização Ramal ------------------------------------*/}

        <Item title="Atualização Ramal" icon={"email"}>

        <h3>Atualizar outro Ramal</h3>

        <form id="fAtualizaOutroRamal" method="post">

            <div>
                <label htmlFor="cpf" >CPF:</label>
                <input id="cpf" name="cpf" type="text" size={20} maxLength={14} className="form-control " placeholder="Nº do CPF" autoComplete="off" />
            </div>

            <div>

                <label htmlFor="dataNascimento" >Data Nascimento:</label>

                <DateBox      
                    id="dataNascimento"
                    label="data de nascimento"
                    type="date"
                    min={add(new Date, {years: -75})}
                />

            </div>

            <div>
                <button type="submit" name="Submit"><i className=" glyphicon glyphicon-search"></i> Buscar</button>
            </div>

        </form>
        
        <div>
        {erro && templateErro()}
        {usuarioRamal && renderUsuarioRamal(usuarioRamal)}
        </div>

        </Item>

    </TabPanel> 

    <p className={estilos.avisoPrivacidade}><em>Esta é um conteúdo da Intranet TCMP/SP. Conteúdo protegido de acesso exclusivo pela Intranet do Tribunal de Contas do Município de São Paulo. Todos os direitos reservados.</em></p>

  </>
);

}

{/*--- Hooks -----------------------------------------------*/}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session = await getSession({ req });
  
    const api_url = process.env.NEXT_PUBLIC_CORPORATIVO_API_URL

    const resAreas = await fetch(api_url + "AreasAtivas");
    const areas = await resAreas.json();

    return {
      props: { 
        areas: areas ? areas : ["(ERRO: nenhuma área"],
        user: session ? session?.user : null
      }
    };
  
  }


{/*--- Helpers -----------------------------------------------*/}


function templateErro() : JSX.Element {

    return (
        <div id="div_error">
            <a href="#" className="close" data-dismiss="alert" aria-label="close">×</a>
            <strong>Atenção!</strong>
            <p>Dados incorretos, verifique!</p>
            <br />
            Atenção: Caso o CPF e Dt.Nascimento estejam corretos e seu nome não for localizado, contate a Unid.Técnica de Registro de Pessoal.
        </div>    
    )

}

