using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Relatorio_Documento
    {
        public Relatorio_Documento()  {}
        public int cdRelatorioDocumento { get; set; }
        public int? cdRelatorio { get; set; }
        public string nmDocumento { get; set; }
        public string dsDocumento { get; set; }
        public bool flPublico { get; set; } // atenção: flPublico indica que o arquivo foi publicado e não que tem acesso público
        public Guid IdFile { get; set; }
        public int Order { get; set; }
        public byte[] Documento { get; set; }
        public string TipoDocumento { get; set; }
        public bool? flProtegido { get; set; }
        public bool? flExigirUsuarioLogado { get; set; }
        public bool? flNotificarPorEmailQuandoOcorrerDownload { get; set; }
        public DateTime? dtCriacao { get; set; }
        public DateTime? dtAlteracao { get; set; }
        public long Size { get; set;}
        
    }
}