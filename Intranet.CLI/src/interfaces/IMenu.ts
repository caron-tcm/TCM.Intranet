
export default interface IMenu {
    cdMenuRodape: string;
    nmMenuRodape?: string;
    dsMenuRodape?: string;
    link?: string;
    flPublico?: boolean;
    nmCurtoMenuRodape?: string;
    cdOrdem?: number;
    flTelaCarregamento?: boolean;
    subItens?: IMenuItem[]
}

export interface IMenuItem {
    cdMenuRodapeItem: string;
    nmMenuRodapeItem: string;
    dsTooltip: string;
    link: string;
    flPublico: boolean;
    nmCurtoMenuRodape: string;
    cdOrdem: number;
    flTelaCarregamento: boolean;
}
