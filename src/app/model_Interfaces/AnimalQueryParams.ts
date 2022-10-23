export class AnimalQueryParams{

    pageNumber: number
    itemsPerPage: number
    category?:string
    MinPrice?:number
    MaxPrice?:number
    OrderBy:string = "id";
    OrderDirection?:string;
    SearchString?:string;


}