using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class Tema
    {
        public Tema() { }
        public int cdTema  { get; set; }
        public string nmTema  { get; set; }
        public string dsTema  { get; set; }
        public string nmArquivo  { get; set; }
        public bool flPublico  { get; set; }
        public Guid IdFile  { get; set; }
        public byte[] Imagem  { get; set; }
        public string dsCorTema  { get; set; }

    }
}
/*
cdTema: number;
nmTema?: string;
dsTema?: string;
nmArquivo?: string;
flPublico: boolean;
IdFile: string;
Imagem?: Uint8Array[];
dsCorTema?: string;
*/