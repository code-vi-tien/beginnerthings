import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

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

    async findProducts(productVariantIds: any[]) {
        
        try {
            const products = await this.productRepo.findManyProducts(productVariantIds);   
            if (!products) {
                throw new NotFoundException(`There's no products`);
            }

            return products; 

        } catch (error) {
            console.error(`Error fetching products for user`, error);
            
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error; // Re-throw the specific error
            }
                throw new BadRequestException('An unexpected error occurred during fetching products.');      
        }
    }

    async findProductPrices(priceSnapshotIds: any[]) {
        try {
            const products = await this.productRepo.findProductPriceSnapshot(priceSnapshotIds);
            if (!products) {
                throw new NotFoundException(`There's no requested products`);
            };

            return products;

        } catch (error) {
            console.error(`Error fetching products for user`, error);
            
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error; // Re-throw the specific error
            }
                throw new BadRequestException('An unexpected error occurred during fetching products.');            
        };
    };
} 