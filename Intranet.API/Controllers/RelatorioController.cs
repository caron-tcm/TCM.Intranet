using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intranet.API.Models;
using Dapper;
using System.Data.Common;
using Microsoft.AspNetCore.Cors;
using Slapper;

namespace Intranet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("IntranetAPI")]
    public class RelatorioController : ControllerBase
    {

        private readonly IntranetApiContext _context;
        private readonly DbConnection _connection;

        public RelatorioController(IntranetApiContext context)
        {
            _context = context;
            _connection = context.Database.GetDbConnection();
        }

        [HttpGet]
        [Route("get/{id}")]
        public async Task<ActionResult<Relatorio>> GetRelatorio(int id) {

            Relatorio Result;

            // busca o relatório

            var sql = @$"
                select rel.*
                  from tRelatorio rel
                 where rel.cdRelatorio = {id}";

            await _context.Database.OpenConnectionAsync();

            Result = (await _connection.QueryAsync<Relatorio>(sql)).FirstOrDefault();

            if (!(Result is null)) {

                // busca o tipo do relatório

                sql = @$"
                    select *
                    from tTipoRelatorio
                    where cdTipoRelatorio = {id}";

                var tipo = (await _connection.QueryAsync<TipoRelatorio>(sql)).FirstOrDefault();

                // busca os documentos do relatório

                sql = @$"
                    select cdRelatorioDocumento,
                        cdRelatorio,
                        nmDocumento,
                        dsDocumento,
                        flPublico,
                        IdFile,
                        [Order],
                        TipoDocumento,
                        flProtegido,
                        flExigirUsuarioLogado,
                        flNotificarPorEmailQuandoOcorrerDownload,
                        dtCriacao,
                        dtAlteracao,
                        DATALENGTH(Documento) as Size
                    from TRelatorioDocumento
                    where cdRelatorio = {id}";

                var documentos = (await _connection.QueryAsync<Relatorio_Documento>(sql));

                // busca as tags do relatório

                sql = @$"
                    select tag.cdTag,
                        tag.nmTag,
                        tag.dsTag,
                        tag.nmArquivo,
                        tag.flPublico,
                        tag.IdFile,
                        tag.dsCorTag
                    from tTagRelatorio as tre
                    inner join tTag as tag
                        on tag.cdTag = tre.cdTag
                    where tre.cdRelatorio = {id}";

                var tags = (await _connection.QueryAsync<Tag>(sql));

                // busca os links do relatório

                sql = @$"
                    select *
                    from tRelatorioLink
                    where cdRelatorio = {id}";

                var links = (await _connection.QueryAsync<Relatorio_Link>(sql));

                // busca os processos do relatório

                sql = @$"
                    select pro.nuTC,
                            pro.cdTipoProcesso,
                            pro.cdOrgao,
                            pro.cdInstancia,
                            pro.cdCompetencia,
                            pro.dtAutuacao,
                            pro.chapaRelator,
                            pro.chapaRevisor,
                            pro.cdProcurador,
                            pro.Objeto,
                            pro.qtVolumes,
                            pro.OficioMemo,
                            pro.EmTransito,
                            pro.Protocolo,
                            pro.TCAnterior,
                            pro.cdUnidadeTramitacaoAtual,
                            pro.dtUltimaTramitacao,
                            pro.RelatorComoPresidente,
                            pro.Lembrete,
                            pro.Interessados,
                            pro.nuTcLegado
                        from TRelatorioProcesso as rel
                        inner join TProcesso as pro
                            on pro.nuTC = rel.nuTC
                        where rel.cdRelatorio = {id}";

                var processos = (await _connection.QueryAsync<Relatorio_Processo>(sql));

                // busca os itens e subitens do relatório

                sql = @$"
                    select rit.cdRelatorioItem,
                           rit.cdRelatorio,
                           rit.nmRelatorioItem,
                           rit.dsRelatorioItem,
                           rit.txtRelatorioItem,
                           rit.[Order],
                           rsi.cdRelatorioSubItem as SubItens_cdRelatorioSubItem,
                           rsi.cdRelatorioItem    as SubItens_cdRelatorioItem,
                           rsi.nmRelatorioSubItem as SubItens_nmRelatorioSubItem,
                           rsi.dsRelatorioSubItem as SubItens_dsRelatorioSubItem,
                           rsi.[Order]            as SubItens_Order
                      from TRelatorioItem rit
                      left join TRelatorioSubItem rsi
                           on rsi.cdRelatorioItem = rit.cdRelatorioItem
                     where cdRelatorio = {id}";

                //var itens = (await _connection.QueryAsync<Relatorio_Item>(sql));

                AutoMapper.Configuration.AddIdentifier(typeof(Relatorio_Item), "cdRelatorioItem");
                AutoMapper.Configuration.AddIdentifier(typeof(Relatorio_SubItem), "cdRelatorioSubItem");

                var dados = _connection.Query<dynamic>(sql: sql);

                var itens = (AutoMapper.MapDynamic<Relatorio_Item>(dados) as IEnumerable<Relatorio_Item>).ToList();

/*
                // testando com o dapper tb

                Relatorio_Item _item = null;
                //Relatorio_SubItem _subItem = null;
                var _itens = new List<Relatorio_Item>();

                sql = @$"
                    select rit.*,
                           rsi.*
                      from TRelatorioItem rit
                      left join TRelatorioSubItem rsi
                           on rsi.cdRelatorioItem = rit.cdRelatorioItem
                     where cdRelatorio = {id}";

                    dados = _connection.Query<Relatorio_Item, Relatorio_SubItem, Relatorio_Item>(
                    sql: sql,
                    map: (item, subItem) =>
                    {
                        if (_item is null || _item.cdRelatorio != item.cdRelatorio) _item = item;
                        if ( !(subItem is null) ) _item.Itens.Append(subItem);

                        return item;
                    },
                    splitOn: "cdRelatorioItem,cdRelatorioSubItem");

*/

                // agrega os dados extras ao relatório

                Result.TipoRelatorio = tipo;
                Result.Documentos = documentos;
                Result.Tags = tags;
                Result.Links = links;
                Result.Processos = processos;
                Result.Itens = itens;

            }

            if (Result is null) 
              return BadRequest(new {mensagem = "Relatorio não encontrado"});
            else
              return Result;

        }
    }
}
