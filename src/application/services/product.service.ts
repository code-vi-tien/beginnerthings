import { Injectable, NotFoundException } from "@nestjs/common";

import { IProductService } from "src/domain/interfaces/services/product.service.interface";
import { ItemDTO } from "../dto/item/item.dto";

import { IProductRepo } from "src/domain/interfaces/repositories/product.repository.interface";

@Injectable()
export class ProductService implements IProductService {
    constructor(private readonly productRepo: IProductRepo) {}

    async findProductVariant(dto: ItemDTO) {

        const productVariant  = await this.productRepo.findProduct(dto.id);

        if (!productVariant) {
            throw new NotFoundException('Product not found.');
        }

        return productVariant
    };

    async validateProductVariants(productVariantIds: any[]) {
        try {
            const products = await this.productRepo.findManyProducts(productVariantIds);
            if (!products)


        } catch (error) {
            
        }
    }
} 