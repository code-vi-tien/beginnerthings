import { Expose, Transform, Type } from "class-transformer";
import { ProductDTO } from "../product/product.dto";
import { ProductVariantDTO } from "../product/product-variant.dto";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CartResponseDTO {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    userId: string;

    @Expose()
    @IsString()
    status: string;

    @Expose()
    @IsDate()
    lastActiveAt: Date;

    @Expose()
    @IsNumber()
    @Transform(({ obj }) => 
        obj.cartItems.reduce((acc, item) => acc + (item.quantity * item.priceSnapshot.priceSnapshot.toNumber()), 0)
    )
    subtotal: number;


    @Expose()
    @IsNumber()
    @Transform(({ obj }) => obj.cartItems.length)
    totalItemsCount: number;

    @Expose()
    @Type(() => CartDetailsDTO)
    cartItems: CartDetailsDTO[];
} 

export class CartDetailsDTO {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsNumber()
    quantity: number; 

    @Expose()
    @IsString()
    priceSnapshotId: string;

    @Expose()
    @IsNumber()
    @Transform(({ obj }) => obj.priceSnapshot.priceSnapshot.toNumber())
    priceSnapshot: number;

    @Expose() 
    @Type(() => ProductDTO)
    product: ProductDTO;
    
    @Expose()
    @Type(() => ProductVariantDTO)
    productVariant: ProductVariantDTO;

    @Expose()
    @IsNumber()
    @Transform(({ obj }) => obj.quantity * obj.priceSnapshot.priceSnapshot.toNumber())
    totalPrice: number;
}