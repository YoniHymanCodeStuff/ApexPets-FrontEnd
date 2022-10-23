export interface Order{
    id: number;
                
    orderTimeStamp: string;
    orderStatus:string;//pending/delivered - should this be bool or are there more states?
    
    deliveryTimeStamp:string;

    orderedAnimalId: number;

    orderedAnimalName:string;

    price:number;
}