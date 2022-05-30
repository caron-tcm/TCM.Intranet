using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Intranet.API.Models;
using Intranet.ProcessosTCM.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Server;
using Intranet.API.Helpers;

namespace Intranet.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("IntranetAPI")]
    public class DocumentoController : ControllerBase
    {

        private readonly IntranetApiContext _context;
        private readonly DbConnection _connection;

        public DocumentoController(IntranetApiContext context)
        {
            _context = context;
            _connection = context.Database.GetDbConnection();
        }
        
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> DocumentoId(Guid idFile, bool download = false)
        {

            ActionResult result =  NotFound();

            Relatorio_Documento arquivo = await negocios_ObterRelatorioDocumento(idFile);

            if (arquivo != null)
            {
                byte[] bytes = arquivo.Documento;

                if (bytes != null)
                {

                    // trata o nome do arquivo

                    var nomeDocumento = Path.GetFileNameWithoutExtension(arquivo.nmDocumento);
                    var tipoDocumento = Path.GetExtension(arquivo.nmDocumento);

                    if (string.IsNullOrEmpty(nomeDocumento)) nomeDocumento = "Documento";
                    if (string.IsNullOrEmpty(tipoDocumento)) tipoDocumento = arquivo.TipoDocumento;

                    var nomeArquivo = nomeDocumento + tipoDocumento;

                    // define se o arquivo é para download

                    var tiposParaDownload = await ObterFileTypeParaDownload();

                    var ehParaDownload = tiposParaDownload.Contains(tipoDocumento.ToUpper());

                    // monta o arquivo a ser retornado

                    ActionResult reconstruirArquivo()
                    {
                        var MIME = nomeArquivo.GetMIMEtype();

                        if (ehParaDownload) return File(bytes, MIME, nomeArquivo);
                        else                return File(bytes, MIME);
                    }

                    if (!arquivo.flPublico) // nota: flPublico indica se o arquivo foi publicado ou não
                    {
                        // o arquivo não foi publicado (está certo isso?)
                        result = reconstruirArquivo();
                    }
                    else if ((arquivo.flExigirUsuarioLogado.GetValueOrDefault() && User.Identity.IsAuthenticated) || (!arquivo.flExigirUsuarioLogado.GetValueOrDefault()))
                    {
                        // o arquivo foi publicado e está restrito ao usuário logado
                        result = reconstruirArquivo();
                    }
                    else
                    {
                        // Pega a url em que o usuário estava
                        //var urlOrigem = Request.RawUrl;

                        // Redireciona para a página de login
                        //result = Redirect("/Account/Login?returnUrl=" + urlOrigem);

                        result = NotFound();
                    }
                }
            }

            return result;
        }


        //-------------------------------------


        private async Task<string[]> ObterFileTypeParaDownload()
        {

            string[] Result = {".7Z",".RTF",".PPS",".PPSX",".DOCX",".DOC",".XLS",".XLSX",".MP3",".HTM",".HTML",".MP3",".ODT",".PDN",".PM6",".PSD"};

            var sql = @"select * from tConfiguracao where chave = 'ListaExtensaoParaDownload'";

            await _context.Database.OpenConnectionAsync();

            var itens = await _connection.QuerySingleOrDefaultAsync<Configuracao>(sql);

            if (itens != null) {
                Result = itens.Valor.Split(",");
            }

            return Result;

        }


        private string[] ObterFileTypesDeImagem()
        {
            return new[] { ".bmp", ".gif", ".jpg", ".png" };
        }

        //-------------------------------------

        private async Task<Relatorio_Documento> negocios_ObterRelatorioDocumento(Guid idFile, bool apenasMetada = false) 
        {

            Relatorio_Documento Result;

            var campos = "cdRelatorio, nmDocumento, dsDocumento, flPublico, IdFile, [Order], TipoDocumento, flProtegido, flExigirUsuarioLogado, flNotificarPorEmailQuandoOcorrerDownload, dtCriacao, dtAlteracao, DATALENGTH(Documento) as Size" + (apenasMetada ? "" : ", Documento");

            var sql = $"select {campos} from tRelatorioDocumento where idFile = '{idFile}'";

            await _context.Database.OpenConnectionAsync();

            Result = await _connection.QuerySingleOrDefaultAsync<Relatorio_Documento>(sql);

            return Result;

        }


        [AllowAnonymous]
        [HttpGet]
        [Route("getThumbnail")]
        public async Task<ActionResult> GetThumbnail(string idFile, int width = 80, int height = 80)
        {
            byte[] data;
            string fileType;
            Relatorio_Documento documento = null;
            Guid idFileGuid;

            //var idFileGuid = Guid.Parse(idFile);

            if (Guid.TryParse(idFile, out idFileGuid))
                documento = await negocios_ObterRelatorioDocumento(idFileGuid, true);

            if (documento != null)
            {
                fileType = documento.nmDocumento.GetMIMEtype();

                if (documento.nmDocumento.IsImageExtension())
                {
                    documento = await negocios_ObterRelatorioDocumento(idFileGuid);
                    data = documento.Documento;
                }
                else
                {
                    var extension = Path.GetExtension(documento.nmDocumento).Replace(".", "");
                    data = GetFileTypeIcon(extension);
                }
            } else {
                data = GetFileTypeIcon("default");
                fileType = "image/png";
            }

            data = data.ResizeImage(width, height);

           return File(data, fileType);

        }

        [AllowAnonymous]        
        [HttpGet]
        [Route("getfiletypeicon")]
        public byte[] GetFileTypeIcon(string extension)
        {
            var iconPath = Server.MapPath($@"App_Data\Images\Free-file-icons\48px\{extension}.png");

            if (!System.IO.File.Exists(iconPath))
                iconPath = Server.MapPath(@"App_Data\Images\icon_file.png");

            byte[] data = System.IO.File.ReadAllBytes(iconPath);

            return data;
        }

    }
}