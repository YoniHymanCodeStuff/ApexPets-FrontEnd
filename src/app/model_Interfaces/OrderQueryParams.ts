export class OrderQueryParams{
    
    pageNumber: number
    itemsPerPage: number
  
    EarliestDate?:Date;
    LatestDate?:Date;
    OrderBy:string = "OrderTimeStamp";
    OrderDirection?:string;
    SearchString?:string;
    OrderStatus:string;
}


