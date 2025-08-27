import { Expose, Transform, Type } from "class-transformer";
import { IsDecimal, IsNumber, IsString } from "class-validator";
import { ProductDTO } from "../product/product.dto";
import { ProductVariantDTO } from "../product/product-variant.dto";

export class ValidateOrderDTO {
    @Expose()
    @IsString()
    id: string;
    
    @Expose()
    @IsString()
    priceSnapshotId: string;
    
    @Expose()
    @IsString()
    userId: string;

    @Expose()
    @IsString()
    cartId: string;

    @Expose()
    @IsDecimal()
    tax: number;

    @Expose()
    @IsDecimal()
    shippingFee: number;

    @Expose()
    @IsDecimal()
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
    @IsDecimal()
    priceSnapshot: number;

    @Expose()
    @Type(() => ProductDTO)
    product: ProductDTO;
    
    @Expose()
    @Type(() => ProductVariantDTO)
    productVariant: ProductVariantDTO;

    @Expose()
    @IsDecimal()
    @Transform(({ obj }) => obj.quantity * obj.priceSnapshot)
    totalPrice: number;
}