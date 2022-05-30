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
using Microsoft.AspNetCore.Authorization;

namespace Intranet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {

        private readonly IntranetApiContext _context;
        private readonly DbConnection _connection;

        public MenuController(IntranetApiContext context)
        {
            _context = context;
            _connection = context.Database.GetDbConnection();
        }
        
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<MenuSimples>> GetMenu(int cdOrdem)
        {

            MenuSimples result;

            var sql = $@"
select *
  from tMenuRodape
 where cdOrdem = {cdOrdem} -- 100 é o superior; 101 é o lateral
select *
  from tMenuRodapeItem
 where cdMenuRodape = (select cdMenuRodape from tMenuRodape where cdOrdem = {cdOrdem}) -- 100 é o superior; 101 é o lateral
 order by cdMenuRodape, cdMenuRodapeItem, cdOrdem;
";

            await _context.Database.OpenConnectionAsync();

            var dados = await _connection.QueryMultipleAsync(sql);

            result = await dados.ReadFirstAsync<MenuSimples>();

            result.SubItens = (await dados.ReadAsync<MenuItem>()).ToList();

            return result;
        }

    }

}