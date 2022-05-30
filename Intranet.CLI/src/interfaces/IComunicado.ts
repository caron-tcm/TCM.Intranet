export default interface IComunicado {
    idComunicado: number;
    tituloComunicado: string;
    leadComunicado: string;
    corpoComunicado: string;
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
}
