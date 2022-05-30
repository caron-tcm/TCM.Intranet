using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Relatorio_Link
    {
        public Relatorio_Link() { }
        public int cdRelatorioLink  { get; set; }
        public int cdRelatorio  { get; set; }
        public string nmLink  { get; set; }
        public string dsLink  { get; set; }
        public string link  { get; set; }
        public int Order  { get; set; }

    }
}
