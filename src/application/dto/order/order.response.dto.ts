import { Expose, Transform, Type } from "class-transformer";
import { IsDecimal, IsString } from "class-validator";
import { ProductDTO } from "../product/product.dto";
import { ProductVariantDTO } from "../product/product-variant.dto";

export class OrderResponseDTO {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
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
    @Type(() => OrderItemsDTO)
    orderItems: OrderItemsDTO[];
}

export class OrderItemsDTO {
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