using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Relatorio_SubItem
    {
        public Relatorio_SubItem() { }
        public int cdRelatorioSubItem  { get; set; }
        public int? cdRelatorioItem  { get; set; }
        public string nmRelatorioSubItem  { get; set; }
        public string dsRelatorioSubItem  { get; set; }
        public int? Order  { get; set; }

    }
}
/*
cdRelatorioSubItem: number;
cdRelatorioItem?: number;
nmRelatorioSubItem?: string;
dsRelatorioSubItem?: string;
Order?: number;
*/