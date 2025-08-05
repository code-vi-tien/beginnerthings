import { IsInt, IsOptional, IsString, IsNotEmpty, Min, IsDecimal } from "class-validator";

export class CartItemDTO {
    @IsString()
    @IsNotEmpty()
    productVariantId: string;

    @IsInt()
    @Min(1)
    quantity: number;

    @IsDecimal()
    price: string;
}