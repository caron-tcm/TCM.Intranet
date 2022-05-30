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
    [EnableCors("IntranetAPI")]
    public class ComunicadoController : ControllerBase
    {

        private readonly IntranetApiContext _context;
        private readonly DbConnection _connection;

        public ComunicadoController(IntranetApiContext context)
        {
            _context = context;
            _connection = context.Database.GetDbConnection();
        }

        /// <summary>
        /// Retorna uma lista de Comunicados
        /// </summary>
        /// <param name="idInicial"> O **id** do primeiro Comunicado a ser retornado **(default="" -> retorna os mais recentes)**</param>  
        /// <param name="quantidade"> A **quantidade** de Comunicados a recuperar **(default=10)**</param>  
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comunicado>>> GetComunicados(int idInicial, int quantidade)
        {

            List<Comunicado> Result;

            if (quantidade == 0) quantidade = 10;
            if (idInicial == 0) idInicial = int.MaxValue;

            var sql = @$"
                select 	
	                rel.cdRelatorio as idComunicado,
	                rel.nmRelatorio as tituloComunicado,
	                rel.dsResumo as leadComunicado,
	                rel.dsRelatorio as CorpoComunicado,
	                rel.dtDataPublicacao as dataPublicacao, 
	                rel.CdRelatorioDocumentoImagemcapa as cdImagemCapa,
	                doc.IdFile as idImagemCapa,
	                rel.dsLegendaImagem,
	                rel.flDestaque ,
	                rel.flAlinhamentoCapaDireita,
	                rel.flMostrarCapaNoResumo,
	                rel.flMostrarTituloDentroCapa,
	                rel.flRetirarContornoImagemCapa,
	                rel.dtAlteracao
                from tRelatorio rel
                left join TRelatorioDocumento doc
                        on doc.CdRelatorioDocumento = rel.cdRelatorioDocumentoImagemCapa
                where rel.cdTipoRelatorio = 40
                    and rel.flPublico = 1
                    and rel.dtDataPublicacao < getdate()
                    and rel.cdRelatorio < {idInicial}
                order by rel.flDestaque desc, rel.dtDataPublicacao desc, rel.cdRelatorio
                offset 0 rows
                fetch next {quantidade} rows only";

            await _context.Database.OpenConnectionAsync();

            Result = (await _connection.QueryAsync<Comunicado>(sql)).ToList();

            return Result;

        }

        /// <summary>
        /// Busca um Comunicado
        /// </summary>
        /// <param name="id">O **id** do Comunicado a ser retornado</param>  
        [HttpGet]
        [Route("get/{id}")]
        public async Task<ActionResult<Comunicado>> GetComunicado(int id) {

            Comunicado Result;

            var sql = @$"
                select 	
	                rel.cdRelatorio as idComunicado,
	                rel.nmRelatorio as tituloComunicado,
	                rel.dsResumo as leadComunicado,
	                rel.dsRelatorio as CorpoComunicado,
	                rel.dtDataPublicacao as dataPublicacao, 
	                rel.CdRelatorioDocumentoImagemcapa as cdImagemCapa,
	                doc.IdFile as idImagemCapa,
	                rel.dsLegendaImagem,
	                rel.flDestaque ,
	                rel.flAlinhamentoCapaDireita,
	                rel.flMostrarCapaNoResumo,
	                rel.flMostrarTituloDentroCapa,
	                rel.flRetirarContornoImagemCapa,
	                rel.dtAlteracao
                from tRelatorio rel
                left join TRelatorioDocumento doc
                        on doc.CdRelatorioDocumento = rel.cdRelatorioDocumentoImagemCapa
                where rel.cdTipoRelatorio = 40
                   and rel.flPublico = 1
                   and rel.cdRelatorio = {id}";

            await _context.Database.OpenConnectionAsync();

            Result = (await _connection.QueryAsync<Comunicado>(sql)).FirstOrDefault();

            return Result;

        }        

    }
}
