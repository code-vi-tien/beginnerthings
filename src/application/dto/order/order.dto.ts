import { Expose, Type } from "class-transformer";
import { IsDecimal } from "class-validator";
import { CartItemDetailsDTO } from "src/application/dto/cart/cart-item-details.dto";

export class OrderResponseDTO {
    @Expose()
    id: string;

    @Expose()
    cartId: string;

    @Expose()
    @IsDecimal()
    subtotal: number;

    @Expose()
    @IsDecimal()
    tax: number;

    @Expose()
    @IsDecimal()
    total: number;

    @Expose()
    @Type(() => CartItemDetailsDTO)
    orderItems: CartItemDetailsDTO[];
}