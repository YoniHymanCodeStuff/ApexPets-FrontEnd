import { Image } from "./Image";

export interface CartAnimal {
    cartItemId: number;
    animalId: number;
    name: string;
    mainPhoto?: Image;
    species: string;
    price: number;
}