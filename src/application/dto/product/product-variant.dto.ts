import { Expose, Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class ProductVariantDTO {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsNumber()
    @Transform(({ obj }) => obj.priceSnapshot.priceSnapshot.toNumber())
    priceSnapshot: number;

    @Expose()
    @IsString()
    variant?: string;
}

export class ProductVariantResponseDTO {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsNumber()
    @Transform(({ obj }) => obj.priceSnapshot.priceSnapshot.toNumber())
    priceSnapshot: number;

    @Expose()
    @IsString()
    variant?: string;
}