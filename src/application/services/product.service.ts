import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { IProductService } from "src/domain/interfaces/services/product.service.interface";
import { IProductRepo } from "src/domain/interfaces/repositories/product.repository.interface";

import { ManyProductsResponseDTO } from "../dto/product/many-product.response.dto";
import { ProductDTO } from "../dto/product/product.dto";
import { ManyProductsDTO } from "../dto/product/many-products.dto";

@Injectable()
export class ProductService implements IProductService {
    constructor(private readonly productRepo: IProductRepo) {}

    async findProductVariant(dto: ProductDTO) {

        const productVariant  = await this.productRepo.findProduct(dto.productVariantId);

        if (!productVariant) {
            throw new NotFoundException('Product not found.');
        }

        return productVariant
    };

    async findProducts(dto: ManyProductsDTO) {
        try {
            const products = await this.productRepo.findManyProducts(dto.productVariantIds);   
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

    async findProductPrices(dto: ManyProductsDTO): Promise<ManyProductsResponseDTO> {
        try {
            const products = await this.productRepo.findProductPriceSnapshot(dto.productPriceSnapshotIds);
            if (!products) {
                throw new NotFoundException(`There's no requested products`);
            };

            const pricesDTO = products.map(p => ({
                id: p.id,
                priceSnapshot: p.priceSnapshot
            }));

            return { productPriceSnapshots: pricesDTO };

        } catch (error) {
            console.error(`Error fetching products for user`, error);
            
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error; // Re-throw the specific error
            }
                throw new BadRequestException('An unexpected error occurred during fetching products.');            
        };
    };
}