using System;
using System.Collections.Generic;

#nullable disable

namespace Intranet.API.Models
{
    public partial class MenuSimples
    {
        public MenuSimples() {   }
        public int cdMenuRodape { get; set; }
        public string nmMenuRodape { get; set; }
        public string dsMenuRodape { get; set; }
        public string link { get; set; }
        public bool flPublico { get; set; }
        public string nmCurtoMenuRodape { get; set; }
        public int cdOrdem { get; set; }
        public bool flTelaCarregamento { get; set; }
        public virtual ICollection<MenuItem> SubItens { get; set; }

    }
}
