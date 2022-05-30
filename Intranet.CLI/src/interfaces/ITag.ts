
export default interface ITag {
    cdTag: number;
    nmTag?: string;
    dsTag?: string;
    nmArquivo?: string;
    flPublico: boolean;
    IdFile: string;
    Imagem?: Uint8Array[];
    dsCorTag?: string;    
}