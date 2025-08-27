import { Injectable } from "@nestjs/common";
import { IProductRepo } from "src/domain/interfaces/repositories/product.repository.interface";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";

@Injectable()
export class ProductRepo implements IProductRepo {
    constructor(private readonly prisma: PrismaService) {}

    async findProduct(productId: string) {
        return await this.prisma.productVariant.findFirst({
            where: {
                productId: productId,
            }
        }); 
    } ;

    async findManyProducts(productVariantIds: any[]) {
        return await this.prisma.productVariant.findMany({
            where: {
                id: {in: productVariantIds}
            },
            include: {
                product: true
            }
        });
    };

    async findProductPriceSnapshot(priceSnapshotIds: any[]) {
        return await this.prisma.priceHistory.findMany({
            where: {
                id: {in: priceSnapshotIds},
            },
        })
    };
} 