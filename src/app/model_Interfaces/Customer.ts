import { Address } from "./Address";
import { Image } from "./Image";
import { Order } from "./Order";
import { ShoppingCartItem } from "./ShoppingCartItem";


export interface Customer {

    id: number;
    firstName: string;
    lastName: string;
    userName: string;

    email?: string;
    avatar: Image;

    creditInfo?: string;
    address: Address;
    orders: Order[];
    shoppingCart: ShoppingCartItem[];
    phoneNumber: number;
}