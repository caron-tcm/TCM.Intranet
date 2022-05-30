using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Relatorio
    {
        public Relatorio() { }
        public int cdRelatorio  { get; set; }
        public string nmRelatorio  { get; set; }
        public string dsRelatorio  { get; set; }
        public DateTime? dtDataPublicacao  { get; set; }
        public string dsResumo  { get; set; }
        public bool flPublico  { get; set; }
        public int cdTipoRelatorio  { get; set; }
        public int? cdSubTipoRelatorio  { get; set; }
        public bool? flProtegido  { get; set; }
        public DateTime? dtDataAtualizacao  { get; set; }
        public string dsLegendaImagem  { get; set; }
        public string dsResumoParaEmail  { get; set; }
        public string nmResponsavel  { get; set; }
        public string txtEmailMonitoramentoDownloadDocumentos  { get; set; }
        public string txtEmailModeradoresFaleConosco  { get; set; }
        public bool? flMostrarFormularioFaleConosco  { get; set; }
        public bool? flMostrarFaqFaleConosco  { get; set; }
        public DateTime? dtReferencia  { get; set; }
        public bool? flInternet  { get; set; }
        public bool flDestaque  { get; set; }
        public bool flEsconderTitulo  { get; set; }
        public int? idReferenciaExterna  { get; set; }
        public int? cdRelatorioDocumentoImagemCapa  { get; set; }
        public bool flAlinhamentoCapaDireita  { get; set; }
        public bool flMostrarCapaNoResumo  { get; set; }
        public bool flMostrarTituloDentroCapa  { get; set; }
        public bool flRetirarContornoImagemCapa  { get; set; }
        public int nmCodigoCursoSemelhante  { get; set; }
        public bool flPermitirInscreverFamiliares  { get; set; }
        public bool flPermitirMenuCustomizado  { get; set; }
        public bool? flCarousel  { get; set; }
        public DateTime? dtCriacao  { get; set; }
        public DateTime? dtAlteracao  { get; set; }

        [NotMapped]
        public TipoRelatorio TipoRelatorio { get; set;}

        [NotMapped]
        public SubTipoRelatorio SubTipoRelatorio { get; set;}

        [NotMapped]
        public IEnumerable<Relatorio_Documento> Documentos { get; set;} 

        [NotMapped]
        public IEnumerable<Tag> Tags {get; set;}

        [NotMapped]
        public IEnumerable<Tema> Temas {get; set;}

        [NotMapped]
        public IEnumerable<Relatorio_Link> Links {get; set;}

        [NotMapped]
        public IEnumerable<Relatorio_Processo> Processos {get; set;}

        [NotMapped]
        public IEnumerable<Relatorio_Item> Itens {get; set;}

    }
}