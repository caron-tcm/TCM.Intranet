using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Relatorio_Processo
    {
        public Relatorio_Processo() { }

        public int cdRelatorio  { get; set; }
        public char nuTC  { get; set; }

    }
}
