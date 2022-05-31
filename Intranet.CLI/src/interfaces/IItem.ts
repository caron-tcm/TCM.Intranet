import ISubItem from "./ISubItem";

export default interface IItem {

    cdRelatorioItem: number;
    cdRelatorio: number;
    nmRelatorioItem: string;
    dsRelatorioItem?: string;
    txtRelatorioItem?: string;
    Order: number;
    subItens: ISubItem[];
   
}
