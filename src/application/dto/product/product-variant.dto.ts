import { Expose } from "class-transformer";

export class ProductVariantDTO {
    @Expose()
    id: string;

    @Expose()
    price: number;

    @Expose()
    variant?: string;
}   