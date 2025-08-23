import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Order, Prisma } from "@prisma/client";
import { IOrderRepo } from "src/domain/interfaces/repositories/order.repository.interface";
import { OrderEntity, OrderItemEntity } from "src/domain/entities/order.entity";

@Injectable()
export class OrderRepo implements IOrderRepo{
    constructor(private prisma: PrismaService) {}

    async createOrder(orderEntity: OrderEntity): Promise<OrderEntity> {
        const order = await this.prisma.order.create({
            data: {
                userId: orderEntity.userId,
                cartId: orderEntity.cartId,
                subtotal: new Prisma.Decimal(orderEntity.subtotal),
                tax: new Prisma.Decimal(orderEntity.tax),
                total: new Prisma.Decimal(orderEntity.total),
                orderItems: {
                    createMany: {
                        data: orderEntity.orderItems
                    }
                },
            },
            include: {
                orderItems: true
            }
        });

        const orderItems = order.orderItems.map(item => new OrderItemEntity(
            item.id,
            item.productVariantId,
            item.quantity,
            item.priceSnapshot.toNumber()
        ));

        return new OrderEntity(
            order.id,
            order.userId,
            order.cartId,
            order.subtotal.toNumber(),
            order.tax.toNumber(),
            null,
            order.total.toNumber(),
            orderItems
        );
    };
};