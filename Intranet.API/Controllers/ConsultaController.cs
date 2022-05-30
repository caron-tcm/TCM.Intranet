using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intranet.API.Models;
using System.Linq.Expressions;
using Dapper;
using System.Data.Common;
using Microsoft.AspNetCore.Cors;

namespace Intranet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultaController : ControllerBase
    {

        private readonly IntranetApiContext _context;
        private readonly DbConnection _connection;
        
        public ConsultaController(IntranetApiContext context)
        {
            _context = context;

            _connection = context.Database.GetDbConnection();            
        }

        [HttpGet]
        [Route("UsuariosAD")]
        public async Task<ActionResult<IEnumerable<UsuarioAD>>> GetUsuariosAD()
        {

            List<UsuarioAD> Result;

            var sql = 
            @"SELECT cdUsuariosAD,
                    cn,
                    displayname,
                    [name],
                    mail,
                    telephonenumber,
                    physicalDeliveryOfficeName,
                    codLotacao
                FROM TUsuariosAD
                order by [name]";

            await _context.Database.OpenConnectionAsync();

            Result = (await _connection.QueryAsync<UsuarioAD>(sql)).ToList();

            return Result;

        }
     
    }
}
