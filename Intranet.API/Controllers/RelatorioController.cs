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

            if (Result != null) {

                // busca o tipo do relatório

                sql = @$"
                    select *
                    from tTipoRelatorio
                    where cdTipoRelatorio = {Result.cdTipoRelatorio}";

                var tipo = (await _connection.QueryAsync<TipoRelatorio>(sql)).FirstOrDefault();

                // busca o subtipo do relatório

                SubTipoRelatorio subTipo = null;

                if (Result.cdSubTipoRelatorio != null) {

                    sql = @$"
                        select *
                        from tSubTipoRelatorio
                        where cdSubTipoRelatorio = {Result.cdSubTipoRelatorio}";

                    subTipo = (await _connection.QueryAsync<SubTipoRelatorio>(sql)).FirstOrDefault();
                }

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
                        tag.dsCorTag,
                        DATALENGTH(tag.Imagem) as ImagemSize
                    from tTagRelatorio as tre
                    inner join tTag as tag
                        on tag.cdTag = tre.cdTag
                    where tre.cdRelatorio = {id}";

                var tags = (await _connection.QueryAsync<Relatorio_Tag>(sql));


                // busca os temas do relatorio

               sql = @$"
                    select tem.cdTema,
                        tem.nmTema,
                        tem.dsTema,
                        tem.nmArquivo,
                        tem.flPublico,
                        tem.IdFile,
                        tem.Imagem,
                        tem.dsCorTema
                    from TTemaRelatorio as ter
                    join TTema as tem
                        on tem.cdTema = ter.cdTema
                    where ter.cdRelatorio = {id}";

                var temas = (await _connection.QueryAsync<Relatorio_Tema>(sql));                

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

                var processos = (await _connection.QueryAsync<Processo>(sql));

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

                AutoMapper.Configuration.AddIdentifier(typeof(Relatorio_Item), "cdRelatorioItem");
                AutoMapper.Configuration.AddIdentifier(typeof(Relatorio_SubItem), "cdRelatorioSubItem");

                var dados = (await _connection.QueryAsync<dynamic>(sql: sql));

                var itens = (AutoMapper.MapDynamic<Relatorio_Item>(dados) as IEnumerable<Relatorio_Item>).ToList();

                // busca os "Fale Conosco" do relatório

                sql = @$"
                    select cdRelatorioFaleConosco,
                        cdRelatorio,
                        IdAspNetUsers,
                        nmAssunto,
                        txtMensagem,
                        dtRegistro,
                        flRespondido,
                        flPublico,
                        dtRespo,
                        txtPerguntaPublica
                    from TRelatorioFaleConosco
                    where cdRelatorio = {id}";

                var faleconosco = (await _connection.QueryAsync<Relatorio_FaleConosco>(sql));

                // agrega os dados extras ao relatório

                Result.TipoRelatorio = tipo;
                Result.SubTipoRelatorio = subTipo;
                Result.Documentos = documentos;
                Result.Tags = tags;
                Result.Temas = temas;
                Result.Links = links;
                Result.Processos = processos;
                Result.Itens = itens;
                Result.FaleConosco = faleconosco;

            }

            if (Result is null) 
              return BadRequest(new {mensagem = "Relatorio não encontrado"});
            else
              return Result;

        }
    }
}
