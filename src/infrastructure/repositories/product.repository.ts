import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";

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