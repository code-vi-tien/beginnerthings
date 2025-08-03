import { Expose } from "class-transformer";

export class GetProductDTO {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    price: number;
}   