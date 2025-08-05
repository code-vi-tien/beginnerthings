import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CartItemDTO } from "../cart/dto/cart-item.dto";
import { ProductRepo } from "./product.repository";

@Injectable()
export class ProductService {
    constructor(private readonly productRepo: ProductRepo) {}

    async findProductVariant(dto: CartItemDTO) {
        const { productVariantId } = dto;

        const productVariant  = await this.productRepo.findProduct(productVariantId);

        if (!productVariant) {
            throw new NotFoundException('Product not found.');
        }

        return productVariant
    }
}