import { Expose, Transform, Type } from "class-transformer";
import { ProductDTO } from "../product/product.dto";
import { ProductVariantDTO } from "../product/product-variant.dto";

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
    @Type(() => CartDetailsDTO)
    cartItems: CartDetailsDTO[];
} 

export class CartDetailsDTO {
    @Expose()
    id: string;

    @Expose()
    quantity: number; 

    @Expose()
    priceSnapshot: number;

    @Expose()
    @Type(() => ProductDTO)
    product: ProductDTO;
    
    @Expose()
    @Type(() => ProductVariantDTO)
    productVariant: ProductVariantDTO;

    @Expose()
    @Transform(({ obj }) => obj.quantity * obj.priceSnapshot)
    totalPrice: number;
}