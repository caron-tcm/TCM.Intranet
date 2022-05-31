using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Relatorio_FaleConosco
    {
        public Relatorio_FaleConosco() { }

        public int cdRelatorioFaleConosco  { get; set; }
        public int cdRelatorio  { get; set; }
        public string IdAspNetUsers  { get; set; }
        public string nmAssunto  { get; set; }
        public string txtMensagem  { get; set; }
        public DateTime dtRegistro  { get; set; }
        public bool? flRespondido  { get; set; }
        public bool? flPublico  { get; set; }
        public DateTime? dtRespo  { get; set; }
        public string txtPerguntaPublica  { get; set; }

    }
}
