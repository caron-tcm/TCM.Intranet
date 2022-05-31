using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Relatorio_Tag
    {
        public Relatorio_Tag() { }
        public int cdTag  { get; set; }
        public string nmTag  { get; set; }
        public string dsTag  { get; set; }
        public string nmArquivo  { get; set; }
        public bool flPublico  { get; set; }
        public Guid IdFile  { get; set; }
        
        [NotMapped]
        public byte?[] Imagem  { get; set; }
        public string dsCorTag  { get; set; }        
    }
}
