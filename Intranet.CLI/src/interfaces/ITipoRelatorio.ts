
export default interface ITipoRelatorio {
    cdTipoRelatorio: number;
    nmTipoRelatorio: string;
    dsTipoRelatorio: string;
    SiglaTipoRelatorio: string;
    flTema: boolean;
    flSecao: boolean;
    flLink: boolean;
    flAnexo: boolean;
    flTcsRelacionado: boolean;
    flImagem: boolean;
    flDtDataacao: boolean;
    flDsRelatorio: boolean;
    flDsResumo: boolean;
    flSubTipoRelatorio: boolean;
    nmCampoDsRelatorio: string;
    nmCampoDsResumo: string;
    nmCampoSubTipoRelatorio: string;
    nmCampoNmRelatorio: string;
    flExibicaoPorNome: boolean;
    flAgruparPorAno: boolean;
    flExibicaoFormatoTabela: boolean;
    txtHtmlContent: string;
    flPublico: boolean;
    flProtegido: boolean;
    flMonitorarDownloadDocumentosPorEmail: boolean;
    flPermitirFaleConosco: boolean;
    flCampoDsRelatorioHtml: boolean;
    flCampoDsResumoHtml: boolean;
    flExibirConsultaCampoDsResumo: boolean;
    flExibirConsultaCampoDsRelatorio: boolean;
    flExibirConsultaAnexos: boolean;
    flExibirConsultaImagem: boolean;
    flExibirConsultaTemas: boolean;
    flExibirConsultaDtPublicacao: boolean;
    flExibirConsultaLabelDsResumo: boolean;
    flExibirConsultaLabelDsRelatorio: boolean;
    flNmResposavel: boolean;
    flExibirConsultaCampoNmResposavel: boolean;
    flDtReferencia: boolean;
    flExibirConsultaCampoDtReferencia: boolean;
    flPermitirEditarIntranetInternet: boolean;
    flPermitirGestaoMensagens: boolean;
    flPermitirDocumentos: boolean;
    flPermitirFeedRss: boolean;
    flExibirConsultaSubTipoRelatorioFormatoTabela: boolean;
    flPermitirTags: boolean;
    flMostrarMensagemConteudoExclusivoIntranet: boolean;
    flPermitirInscreverFamiliares: boolean;
    flPermitirMenuCustomizado: boolean;
}