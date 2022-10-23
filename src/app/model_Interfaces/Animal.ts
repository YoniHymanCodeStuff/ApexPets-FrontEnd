import { Image } from "./Image";

export interface Animal {
    id: number;
    name: string;
    category: string;
    mainPhoto?: Image;
    required_Habitat: string;
    species: string;
    description: string;
    images: Image[];
    price:number;
}