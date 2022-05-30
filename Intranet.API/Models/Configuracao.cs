using System;
using System.Collections.Generic;

#nullable disable

namespace Intranet.ProcessosTCM.Models
{
    public partial class Configuracao
    {
        public int Id { get; set; }
        public string Chave { get; set; }
        public string Valor { get; set; }
    }
}
