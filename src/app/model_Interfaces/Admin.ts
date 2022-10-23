import { Image } from "./Image";

export interface Admin{
    id: number;
    firstName: string;
    lastName: string;
    userName: string;

    email?: string;
    avatar: Image;
}