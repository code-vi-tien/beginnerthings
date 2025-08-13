import { Expose } from "class-transformer";
import { IsInt, IsString, IsNotEmpty, Min, IsDecimal } from "class-validator";

export class ItemDTO {
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
    price: string;

    constructor(partial: Partial<ItemDTO>) {
    Object.assign(this, partial)
  }
}

export class ItemResponseDTO {
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
    price: string;

    constructor(partial: Partial<ItemDTO>) {
    Object.assign(this, partial)
  }
}