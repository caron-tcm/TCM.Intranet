using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Processo
    {
        public Processo() { }

        public string nuTC  { get; set; }
        public int? cdTipoProcesso  { get; set; }
        public int? cdOrgao  { get; set; }
        public int? cdInstancia  { get; set; }
        public int? cdCompetencia  { get; set; }
        public DateTime? dtAutuacao  { get; set; }
        public string chapaRelator  { get; set; }
        public string chapaRevisor  { get; set; }
        public int? cdProcurador  { get; set; }
        public string Objeto  { get; set; }
        public short? qtVolumes  { get; set; }
        public string OficioMemo  { get; set; }
        public byte? EmTransito  { get; set; }
        public string Protocolo  { get; set; }
        public string TCAnterior  { get; set; }
        public string cdUnidadeTramitacaoAtual  { get; set; }
        public DateTime? dtUltimaTramitacao  { get; set; }
        public byte? RelatorComoPresidente  { get; set; }
        public string Lembrete  { get; set; }
        public string Interessados  { get; set; }
        public string nuTcLegado  { get; set; }

    }
}
