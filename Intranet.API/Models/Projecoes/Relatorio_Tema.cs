using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Relatorio_Tema
    {
        public Relatorio_Tema() { }
        public int cdTema  { get; set; }
        public string nmTema  { get; set; }
        public string dsTema  { get; set; }
        public string nmArquivo  { get; set; }
        public bool flPublico  { get; set; }
        public Guid IdFile  { get; set; }
        public byte[] Imagem  { get; set; }
        public string dsCorTema  { get; set; }

    }
}
