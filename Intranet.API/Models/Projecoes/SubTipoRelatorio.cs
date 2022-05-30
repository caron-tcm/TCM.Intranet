using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

//#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public class SubTipoRelatorio
    {
        public SubTipoRelatorio() {}
        public int cdSubTipoRelatorio  { get; set; }
        public char SiglaTipoRelatorio  { get; set; }
        public string nmTipoRelatorio  { get; set; }
        public string dsTipoRelatorio  { get; set; }
        public int? cdOrdem  { get; set; }
        public int cdTipoRelatorio  { get; set; }
        public string txtHtmlContent  { get; set; }

    }
}

/*
cdSubTipoRelatorio: number;
SiglaTipoRelatorio: string;
nmTipoRelatorio?: string;
dsTipoRelatorio?: string;
cdOrdem?: number;
cdTipoRelatorio: number;
txtHtmlContent?: string;
*/