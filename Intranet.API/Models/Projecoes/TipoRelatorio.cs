using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

//#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public class TipoRelatorio
    {
        public TipoRelatorio() {}
        public int cdTipoRelatorio { get; set; }
        public string nmTipoRelatorio { get; set; }
        public string dsTipoRelatorio { get; set; }
        public string SiglaTipoRelatorio { get; set; }
        public bool? flTema { get; set; }
        public bool? flSecao { get; set; }
        public bool? flLink { get; set; }
        public bool? flAnexo { get; set; }
        public bool? flTcsRelacionado { get; set; }
        public bool? flImagem { get; set; }
        public bool? flDtDataPublicacao { get; set; }
        public bool? flDsRelatorio { get; set; }
        public bool? flDsResumo { get; set; }
        public bool? flSubTipoRelatorio { get; set; }
        public string nmCampoDsRelatorio { get; set; }
        public string nmCampoDsResumo { get; set; }
        public string nmCampoSubTipoRelatorio { get; set; }
        public string nmCampoNmRelatorio { get; set; }
        public bool? flExibicaoPorNome { get; set; }
        public bool? flAgruparPorAno { get; set; }
        public bool? flExibicaoFormatoTabela { get; set; }
        public string txtHtmlContent { get; set; }
        public bool? flPublico { get; set; }
        public bool? flProtegido { get; set; }
        public bool? flMonitorarDownloadDocumentosPorEmail { get; set; }
        public bool? flPermitirFaleConosco { get; set; }
        public bool? flCampoDsRelatorioHtml { get; set; }
        public bool? flCampoDsResumoHtml { get; set; }
        public bool? flExibirConsultaCampoDsResumo { get; set; }
        public bool? flExibirConsultaCampoDsRelatorio { get; set; }
        public bool? flExibirConsultaAnexos { get; set; }
        public bool? flExibirConsultaImagem { get; set; }
        public bool? flExibirConsultaTemas { get; set; }
        public bool? flExibirConsultaDtPublicacao { get; set; }
        public bool? flExibirConsultaLabelDsResumo { get; set; }
        public bool? flExibirConsultaLabelDsRelatorio { get; set; }
        public bool? flNmResposavel { get; set; }
        public bool? flExibirConsultaCampoNmResposavel { get; set; }
        public bool? flDtReferencia { get; set; }
        public bool? flExibirConsultaCampoDtReferencia { get; set; }
        public bool? flPermitirEditarIntranetInternet { get; set; }
        public bool flPermitirGestaoMensagens { get; set; }
        public bool flPermitirDocumentos { get; set; }
        public bool flPermitirFeedRss { get; set; }
        public bool flExibirConsultaSubTipoRelatorioFormatoTabela { get; set; }
        public bool flPermitirTags { get; set; }
        public bool flMostrarMensagemConteudoExclusivoIntranet { get; set; }
        public bool flPermitirInscreverFamiliares { get; set; }
        public bool flPermitirMenuCustomizado { get; set; }
    
    }
}