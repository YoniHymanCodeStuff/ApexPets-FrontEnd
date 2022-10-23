import { Address } from "./Address";

export interface orderWithCustomer{

    orderId: number;
                
    orderTimeStamp: string;
    orderStatus:string;//pending/delivered - should this be bool or are there more states?
    
    deliveryTimeStamp:string;

    orderedAnimalId: number;

    orderedAnimalName:string;

    price:number;

    customerId:number;
    
    customerName: string;
    customeruserName: string;
    customerAddress: string;
    customerEmail?: string;
    customerPhoneNumber: number;


}

