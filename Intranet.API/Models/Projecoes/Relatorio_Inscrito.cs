using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Relatorio_Inscrito
    {
        public Relatorio_Inscrito() { }

        public int cdRelatorioInscritos  { get; set; }
        public int cdRelatorio  { get; set; }
        public string IdAspNetUsers  { get; set; }
        public bool? flCancelado  { get; set; }
        public DateTime dtInscricao  { get; set; }
        public DateTime? dtDesinscricao  { get; set; }

    }
}
/*
cdRelatorioInscritos: number;
cdRelatorio: number;
IdAspNetUsers: string;
flCancelado?: boolean;
dtInscricao: Date;
dtDesinscricao?: Date;
*/