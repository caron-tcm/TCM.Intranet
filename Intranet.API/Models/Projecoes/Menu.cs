using System;
using System.Collections.Generic;

#nullable disable

namespace Intranet.API.Models
{
    public partial class Menu
    {
        public Menu() {   }

        public int CdMenu { get; set; }
        public string NmMenu { get; set; }
        public string NmTooltip { get; set; }
        public string DsTooltip { get; set; }
        public int? CdParentMenu { get; set; }
        public bool FlPublico { get; set; }
        public string CdTipoImagem { get; set; }
        public string DsImagePath { get; set; }
        public Guid IdFile { get; set; }
        public byte[] Imagem { get; set; }
        public string Url { get; set; }
        public int? CdOrdem { get; set; }
        public bool? FlTelaCarregamento { get; set; }

        public virtual ICollection<Menu> SubItens { get; set; }

    }
}
