import { Expose, Transform, Type } from "class-transformer";
import { CartItemDetailsDTO } from "./cart-item-details.dto";

export class CartResponseDTO {
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
        obj.cartItems.reduce((acc, item) => acc + (item.quantity * item.priceSnapshot.toNumber()), 0)
    )
    subtotal: number;


    @Expose()
    @Transform(({ obj }) => obj.cartItems.length)
    totalItemsCount: number;

    @Expose()
    @Type(() => CartItemDetailsDTO)
    cartItems: CartItemDetailsDTO[];
}