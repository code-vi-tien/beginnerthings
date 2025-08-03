import { Expose, Transform, Type } from "class-transformer";
import { GetProductDTO } from "../../product/dto/get-product.dto";

export class GetCartItemResponseDTO {
    @Expose()
    id: string;

    @Expose()
    quantity: number;

    @Expose()
    variant?: string;

    @Expose()
    priceSnapshot: number;

    @Expose()
    @Type(() => GetProductDTO)
    product: GetProductDTO;

    @Expose()
    @Transform(({ obj }) => obj.quantity * obj.priceSnapshot)
    totalPrice: number;
}