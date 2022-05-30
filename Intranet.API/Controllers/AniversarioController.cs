using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intranet.API.Models;
using System.Linq.Expressions;

namespace Intranet.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AniversarioController : ControllerBase
    {

        private readonly IntranetApiContext _context;

        public AniversarioController(IntranetApiContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retorna uma lista com os aniversariantes do dia
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aniversariante>>> GetAniversarios()
        {

            List<Aniversariante> Result;

            // query migrada da antiga intranet (default.asp)

            var sql = 
            @"SELECT CASE WHEN Left(CONVERT(Varchar,vP.DATA_NASC,103),5) <> Left(CONVERT(Varchar,(GETDATE()),103),5) 
            THEN Corporativo.dbo.FDIA_SEMANA_EXT(CONVERT(datetime,(CASE WHEN Left(CONVERT(Varchar,vp.DATA_NASC,103),5) = '29/02'
                                                            THEN '28/02'
															ELSE Left(CONVERT(Varchar,vp.DATA_NASC,103),5)
														END) + '/' + right(CONVERT(Varchar,(getdate()),103),4),103))
			ELSE 'HOJE'
            END Diadasemana, 
            Left(CONVERT(Varchar,vP.DATA_NASC,103),5) Aniversario, vP.Nome, vP.Chapa, vP.Descricao Lotacao, RIGHT(Convert(varchar,vP.DATA_NASC,112),4) Ordem
            FROM Corporativo2.dbo.vwPessoal vP,
                (SELECT RIGHT(Convert(varchar,MAX(Data),112),4) As dtMin,
                        RIGHT(Convert(varchar, CONVERT(Datetime, str(YEAR(getdate()),4,0) + REPLICATE('0', 2-len(month(getdate()))) + substring(str(month(getdate()),2,0),3-len(month(getdate())),2) + REPLICATE('0',2-len(day(getdate())))+substring(str(day(getdate()),2,0),3-len(day(getdate())),2) ,112) ,112),4) as dtMax 
                    FROM Corporativo2.dbo.TCalendario
                    Where IndicadorDiaUtil = 1 AND Data < CONVERT(Datetime, str(YEAR(getdate()),4,0) + REPLICATE('0',2-len(month(getdate()))) + substring(str(month(getdate()),2,0),3-len(month(getdate())),2) + REPLICATE('0',2-len(day(getdate())))+substring(str(day(getdate()),2,0),3-len(day(getdate())),2) ,112)
                ) vwDatas
            WHERE vP.EMPRESA='001'
            AND vP.DEMISSAO IS NULL
            AND vP.CCUSTO NOT IN ('000','074','078','080','099')
            AND RIGHT(Convert(varchar,vP.DATA_NASC,112),4) <= vwDatas.dtMax
            AND RIGHT(Convert(varchar,vP.DATA_NASC,112),4)  > vwDatas.dtMin
            AND CHAPA NOT IN (SELECT Chapa FROM Corporativo.dbo.tExclusaoAniversario As lamasculinidadfragilhacemaloschistes)
            ORDER by 6 ,3";

            Result = await _context.Aniversariantes.FromSqlRaw(sql).ToListAsync();

            return Result;

        }
     
    }
}
