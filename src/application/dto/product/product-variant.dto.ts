import { Expose, Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class ProductVariantDTO {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsNumber()
    @Transform(({ obj }) => obj.priceSnapshot.priceSnapshot.toNumber())
    price: number;

    @Expose()
    @IsString()
    variant?: string;
} 