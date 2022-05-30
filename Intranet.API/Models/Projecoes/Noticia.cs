using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Noticia
    {
        public Noticia() { }
        public int idNoticia { get; set; }
        public string tituloNoticia { get; set; }
        public string leadNoticia { get; set; }
        public string CorpoNoticia { get; set; }
        public DateTime dataPublicacao { get; set; }
        public int? cdImagemCapa { get; set; }
        public Guid? idImagemCapa { get; set; }
        public string dsLegendaImagem { get; set; }
        public bool flDestaque { get; set; }
        public bool flCarousel { get; set; }
        public bool flAlinhamentoCapaDireita { get; set; }
        public bool flMostrarCapaNoResumo { get; set; }
        public bool flMostrarTituloDentroCapa { get; set; }
        public bool flRetirarContornoImagemCapa { get; set; }
        public DateTime? dtAlteracao { get; set; }
        
        [NotMapped]
        public TipoRelatorio TipoRelatorio { get; set;}

        [NotMapped]
        public IEnumerable<Relatorio_Documento> Documentos { get; set;}

    }
}