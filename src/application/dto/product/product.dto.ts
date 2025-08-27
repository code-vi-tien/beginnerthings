import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class ProductDTO {
    @Expose()
    @IsString()
    productVariantId: string;

    @Expose()
    @IsString()
    name: string;
}