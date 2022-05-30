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

        public char nuTC  { get; set; }
        public int? cdTipoProcesso  { get; set; }
        public int? cdOrgao  { get; set; }
        public int? cdInstancia  { get; set; }
        public int? cdCompetencia  { get; set; }
        public DateTime? dtAutuacao  { get; set; }
        public char? chapaRelator  { get; set; }
        public char? chapaRevisor  { get; set; }
        public int? cdProcurador  { get; set; }
        public string Objeto  { get; set; }
        public short? qtVolumes  { get; set; }
        public string OficioMemo  { get; set; }
        public byte? EmTransito  { get; set; }
        public string Protocolo  { get; set; }
        public string TCAnterior  { get; set; }
        public char? cdUnidadeTramitacaoAtual  { get; set; }
        public DateTime? dtUltimaTramitacao  { get; set; }
        public byte? RelatorComoPresidente  { get; set; }
        public string Lembrete  { get; set; }
        public string Interessados  { get; set; }
        public string nuTcLegado  { get; set; }

    }
}
/*
nuTC: string;
cdTipoProcesso?: number;
cdOrgao?: number;
cdInstancia?: number;
cdCompetencia?: number;
dtAutuacao?: Date;
chapaRelator?: string;
chapaRevisor?: string;
cdProcurador?: number;
Objeto?: string;
qtVolumes?: number;
OficioMemo?: string;
EmTransito?: number;
Protocolo?: string;
TCAnterior?: string;
cdUnidadeTramitacaoAtual?: string;
dtUltimaTramitacao?: Date;
RelatorComoPresidente?: number;
Lembrete?: string;
Interessados?: string;
nuTcLegado?: string;
*/