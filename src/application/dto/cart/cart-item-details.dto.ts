import { Expose, Transform, Type } from "class-transformer";
import { ProductVariantDTO } from "../product/product-variant.dto";
import { ProductDTO } from "src/application/dto/product/product.dto";

export class CartItemDetailsDTO {
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