import { IsInt, IsOptional, IsString, IsNotEmpty, Min } from "class-validator";

export class CartItemDTO {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsInt()
    @Min(1)
    quantity: number;

    @IsOptional()
    @IsString()
    variant?: string;
}