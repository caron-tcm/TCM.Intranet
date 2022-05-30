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
    public class NoticiaController : ControllerBase
    {

        private readonly IntranetApiContext _context;
        private readonly DbConnection _connection;

        public NoticiaController(IntranetApiContext context)
        {
            _context = context;
            _connection = context.Database.GetDbConnection();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Noticia>>> GetNoticias(int idInicial, int quantidade)
        {

            List<Noticia> Result;

            var sinalBusca = "<";

            if (idInicial == 0) idInicial=int.MaxValue;

            if (quantidade == 0) quantidade = 10;

            var sql = @$"
                select rel.cdRelatorio as idNoticia,
	                   rel.nmRelatorio as tituloNoticia,
	                   rel.dsResumo as leadNoticia,
	                   rel.dsRelatorio as CorpoNoticia,
	                   rel.dtDataPublicacao as dataPublicacao, 
	                   rel.CdRelatorioDocumentoImagemcapa as cdImagemCapa,
	                   doc.IdFile as idImagemCapa,
	                   rel.dsLegendaImagem,
	                   rel.flDestaque as flDestaque,
                     rel.flCarousel as flCarousel,
	                   rel.flAlinhamentoCapaDireita,
	                   rel.flMostrarCapaNoResumo,
	                   rel.flMostrarTituloDentroCapa,
	                   rel.flRetirarContornoImagemCapa,
	                   rel.dtAlteracao
                  from tRelatorio rel
                  left join TRelatorioDocumento doc
                    on doc.CdRelatorioDocumento = rel.cdRelatorioDocumentoImagemCapa
                 where rel.cdTipoRelatorio = 75
                   and rel.flPublico = 1
                   and rel.dtDataPublicacao < getdate()
                   and rel.cdRelatorio {sinalBusca} {idInicial}
                 order by (rel.flCarousel * 2 + rel.flDestaque) desc, rel.dtDataPublicacao desc, rel.cdRelatorio
                offset 0 rows
                 fetch next {quantidade} rows only";

            await _context.Database.OpenConnectionAsync();

            Result = (await _connection.QueryAsync<Noticia>(sql)).ToList();

            return Result;

        }
/*     */
        [HttpGet]
        [Route("get/{id}")]
        public async Task<ActionResult<Noticia>> GetNoticia(int id) {

            Noticia Result;

            // pega o relatório

            var sql = @$"
                select rel.cdRelatorio as idNoticia,
	                   rel.nmRelatorio as tituloNoticia,
	                   rel.dsResumo as leadNoticia,
	                   rel.dsRelatorio as CorpoNoticia,
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
                 where rel.cdTipoRelatorio = 75
                   and rel.flPublico = 1
                   and rel.cdRelatorio = {id}";

            await _context.Database.OpenConnectionAsync();

            Result = (await _connection.QueryAsync<Noticia>(sql)).FirstOrDefault();

            // pega o tipo do relatório

            sql = @$"
                select *
                  from tTipoRelatorio
                 where cdTipoRelatorio = 75";

            var tipo = (await _connection.QueryAsync<TipoRelatorio>(sql)).FirstOrDefault();

            // pega os documentos do relatório

            sql = @$"
                select *
                  from TRelatorioDocumento
                 where cdRelatorio = {id}";

            var documentos = (await _connection.QueryAsync<Relatorio_Documento>(sql));

            // monta o relatório e retorna

            Result.TipoRelatorio = tipo;
            Result.Documentos = documentos;

            return Result;

        }
 
    }
}
