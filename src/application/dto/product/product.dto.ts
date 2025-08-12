import { Expose } from "class-transformer";

export class ProductDTO {
    @Expose()
    id: string;

    @Expose()
    name: string;
}