import { Expose, Transform, Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { ProductDTO } from "../product/product.dto";
import { ProductVariantDTO } from "../product/product-variant.dto";

export class OrderResponseDTO {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    userId: string;

    @Expose()
    @IsString()
    cartId: string;

    @Expose()
    @IsNumber()
    tax: number;

    @Expose()
    @IsNumber()
    shippingFee: number;

    @Expose()
    @IsNumber()
    total: number;

    @Expose()
    @Type(() => OrderItemsDTO)
    orderItems: OrderItemsDTO[];
}

export class OrderItemsDTO {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsNumber()
    quantity: number; 

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