import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Order, Prisma } from "@prisma/client";

@Injectable()
export class OrderRepo {
    constructor(private prisma: PrismaService) {}

    async createOrder(userId: string, orderData): Promise<Order> {
        return await this.prisma.order.create({
            data: {
                userId: userId,
                cartId: orderData.cartId,
                subtotal: new Prisma.Decimal(orderData.subtotal),
                tax: new Prisma.Decimal(orderData.tax),
                total: new Prisma.Decimal(orderData.total),
                orderItems: {
                    createMany: {
                        data: orderData.orderItems
                    }
                },
            },
            include: {
                orderItems: true
            }
        })
    }
}   