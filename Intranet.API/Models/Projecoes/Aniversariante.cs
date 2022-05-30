using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Aniversariante
    {
        public Aniversariante() { }
        public string Diadasemana { get; set; }
        public string Aniversario { get; set; }
        public string Nome { get; set; }
        public string Chapa { get; set; }
        public string Lotacao { get; set; }
        public string Ordem { get; set; }			

    }
}