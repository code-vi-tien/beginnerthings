import { Expose, Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class ManyProductsResponseDTO {
    @Expose()
    @Type(() => PricesDTO)
    productPriceSnapshots: PricesDTO[];
}

export class PricesDTO {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsNumber()
    price: number;
}