import { Expose, Transform } from "class-transformer";
import { IsInt, IsString, IsNotEmpty, Min, IsDecimal } from "class-validator";

export class CartItemDTO {
    @Expose()  
    @IsString()
    id: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    productVariantId: string;

    @Expose()
    @IsString()
    variant?: string;

    @Expose()
    @IsInt()
    @Min(1)
    quantity: number;

    @Expose()
    @IsString()
    priceSnapshotId: string;

    @Expose()
    @IsDecimal()
    @Transform(({ obj }) => obj.priceSnapshot.priceSnapshot.toNumber())
    priceSnapshot: number;
}

export class CartItemResponseDTO {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    productVariantId: string;

    @Expose()
    @IsString()
    variant?: string;

    @Expose()
    @IsInt()
    @Min(1)
    quantity: number;

    @Expose()
    @IsDecimal()
    @Transform(({ obj }) => obj.priceSnapshot.priceSnapshot.toNumber())
    priceSnapshot: number;

    @Expose()
    @IsString()
    cartId: string;

    constructor(partial: Partial<CartItemResponseDTO>) {
    Object.assign(this, partial)
  }
}