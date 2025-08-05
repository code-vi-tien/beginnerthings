import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CartItemDTO } from "../cart/dto/cart-item.dto";
import { Product } from "@prisma/client";
import { GetProductDTO } from "./dto/get-product.dto";

@Injectable()
export class ProductRepo {
    constructor(private readonly prisma: PrismaService) {}

    async findProduct(productId: string) {
        return await this.prisma.productVariant.findFirst({
            where: {
                productId: productId,
            }
        }); 
    } 
}