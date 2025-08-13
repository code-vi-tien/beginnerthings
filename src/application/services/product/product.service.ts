import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ItemDTO } from "../../dto/item/item.dto";
import { ProductRepo } from "../../../infrastructure/repositories/product.repository";
import { IProductService } from "src/domain/interfaces/services/product.service.interface";

@Injectable()
export class ProductService implements IProductService {
    constructor(private readonly productRepo: ProductRepo) {}

    async findProductVariant(dto: ItemDTO) {

        const productVariant  = await this.productRepo.findProduct(dto.id);

        if (!productVariant) {
            throw new NotFoundException('Product not found.');
        }

        return productVariant
    }
} 