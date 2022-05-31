using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Relatorio_Item
    {
        public Relatorio_Item() { }
        public int cdRelatorioItem  { get; set; }
        public int cdRelatorio  { get; set; }
        public string nmRelatorioItem  { get; set; }
        public string dsRelatorioItem  { get; set; }
        public string txtRelatorioItem  { get; set; }
        public int Order  { get; set; }

        [NotMapped]
        public IEnumerable<Relatorio_SubItem> SubItens {get; set;}

    }
}
