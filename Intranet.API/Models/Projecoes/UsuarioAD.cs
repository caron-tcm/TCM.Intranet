using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intranet.API.Models
{
    [Keyless]
    public partial class UsuarioAD
    {
        public int cdUsuariosAD  { get; set; }
        public string cn  { get; set; }
        public string displayname  { get; set; }
        public string name  { get; set; }
        public string mail  { get; set; }
        public string telephonenumber  { get; set; }
        public string physicalDeliveryOfficeName  { get; set; }
        public int? codLotacao  { get; set; }
    }
}

