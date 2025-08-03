import { Expose, Transform, Type } from "class-transformer";
import { GetCartItemResponseDTO } from "./get-cart-item.response.dto";

export class GetCartResponseDTO {
    @Expose()
    id: string;

    @Expose()
    userId: string;

    @Expose()
    status: string;

    @Expose()
    lastActiveAt: Date;

    @Expose()
    @Transform(({ obj }) => 
        obj.cartItems.reduce((acc, item) => acc + (item.quantity * item.priceSnapshot), 0)
    )
    subtotal: number;


    @Expose()
    @Transform(({ obj }) => obj.cartItems.length)
    totalItemsCount: number;

    @Expose()
    @Type(() => GetCartItemResponseDTO)
    cartItems: GetCartItemResponseDTO[];
}