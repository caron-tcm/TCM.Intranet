import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ptBR } from "date-fns/locale";

export enum eTipoDeArquivo {
    Desconhecido = "und",
    Imagem = "img",
    Documento = "doc",
    Audio = "mus",
    Video = "vid"
}

export enum eTipoRelatorio {
    Curso = "CURSOS",
    Licitacao = "LICITA",
    MenuPR = "MENUPR",
    Noticia = "NOTICI",
    PaginaWeb = "PAGWEB",
    Pauta = "PAUTAS",
    RelatorioGeral = "RGERAL"
}

const documentoExt = [".csv",".doc",".docx",".htm",".html",".json",".odp",".ods",".odt",".pdf",".pps",".ppsx",".ppt",".pptx",".rtf",".xls",".xlsm",".xlsx",".xml",".zip"]
const imagemExt = [".bmp",".gif",".jfif",".jpeg",".jpg",".png",".tif",".tiff"]
const audioExt = [".aac",".aiff",".alac",".flac",".m4a",".mp3",".ogg",".pcm",".wav",".wma"]
const videoExt = [".3gp",".aaf",".asf",".avi",".flv",".mp4",".mpe",".mpeg",".mpg",".wmv",".webp"]

export function FormatarData(data: Date, mascara: string): string {

    if (mascara!="o") {
        return format(new Date(data), mascara, {locale: ptBR})
    } else {
        return formatDistanceToNow(new Date(data), {locale: ptBR})
    }

}

export function PathInfo(nomeArquivo: string) {

    let parts=nomeArquivo.match(/(.*?\/)?(([^/]*?)(\.[^/.]+?)?)(?:[?#].*)?$/);

    return { path:parts[1], file:parts[2], name:parts[3], ext:parts[4] };
}

export function BuscarTipoDeArquivo(nomeArquivo: string) : eTipoDeArquivo {

    let result = eTipoDeArquivo.Desconhecido

    //let extension = nomeArquivo.split(".").pop()
    let extensao = PathInfo(nomeArquivo).ext.toLowerCase()

    if (documentoExt.indexOf(extensao) != -1) result = eTipoDeArquivo.Documento
    else if (imagemExt.indexOf(extensao) != -1) result = eTipoDeArquivo.Imagem
        else if (audioExt.indexOf(extensao) != -1) result = eTipoDeArquivo.Audio
            else if (videoExt.indexOf(extensao) != -1) result =eTipoDeArquivo.Video

    return result

}

export function BytesToSize(bytes: number): string {

    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    let result = "n/a"

    if (bytes !== 0) {

        const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())

        if (i !== 0) {
            result = `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
        } else {
            result = `${bytes} ${sizes[i]}`
        }

    }

    return result

  }

 export function Hash53(str: string, seed = 0) {

    // cybr53 -- origem: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript

    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;

    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    
    return 4294967296 * (2097151 & h2) + (h1>>>0);

};

export function Hash32(s: string) {

    // TSH -- origem: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript

    for(var i=0,h=9;i<s.length;)
        h=Math.imul(h^s.charCodeAt(i++),9**9);
    
    return h^h>>>9

}

export function Fetch(url: string, opcoes: object) {
        
    return new Promise((resolve, reject) => {
  
    const xhr = new XMLHttpRequest()
    
    xhr.onload = () => {
      
      const options = {
          status: xhr.status,
          statusText: xhr.statusText,
          ...opcoes
      }
      
      resolve(new Response(xhr.response, options))
    }
    
    xhr.onerror = () => {
      reject(new TypeError("Fetch: falha na solicitação"))
    }
  }
    )
}