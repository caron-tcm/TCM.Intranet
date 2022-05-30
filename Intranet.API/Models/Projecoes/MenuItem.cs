using System;
using System.Collections.Generic;

#nullable disable

namespace Intranet.API.Models
{
    public partial class MenuItem
    {
        public MenuItem() {   }
        public int cdMenuRodapeItem { get; set; }
        public string nmMenuRodapeItem { get; set; }
        public string dsTooltip { get; set; }
        public string link { get; set; }
        public bool flPublico { get; set; }
        public string nmCurtoMenuRodape { get; set; }
        public int cdOrdem { get; set; }
        public bool flTelaCarregamento { get; set; }

    }
}
