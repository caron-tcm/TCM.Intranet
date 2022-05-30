import ITipoRelatorio from "./ITipoRelatorio";

export default interface INoticia   {
    idNoticia: number;
    tituloNoticia: string;
    leadNoticia: string;
    corpoNoticia: string;
    dataPublicacao: Date;
    cdImagemCapa: number;
    idImagemCapa: string;
    dsLegendaImagem: string;
    flDestaque: boolean;
    flAlinhamentoCapaDireita: boolean;
    flMostrarCapaNoResumo: boolean;
    flMostrarTituloDentroCapa: boolean;
    flRetirarContornoImagemCapa: boolean;
    dtAlteracao: Date;
    tipoRelatorio: ITipoRelatorio;
  }
