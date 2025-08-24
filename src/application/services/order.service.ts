import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { CartDetailsEntity } from "src/domain/entities/cart-details.entity";

import { OrderResponseDTO } from "../dto/order/order.response.dto";

import { IOrderService } from "src/domain/interfaces/services/order.service.interface";
import { ICartService } from "src/domain/interfaces/services/cart.service.interface";

import { IOrderRepo } from "src/domain/interfaces/repositories/order.repository.interface";
import { CreateOrderDTO } from "../dto/order/create-order.dto";
import { OrderEntity, OrderItemEntity } from "src/domain/entities/order.entity";
import { GetOrderDTO } from "../dto/order/get-order.dto";


@Injectable()
export class OrderService implements IOrderService{
    constructor(
        private readonly orderRepo: IOrderRepo,
        private readonly cartService: ICartService
    ) {};

    private _calculateOrderTotals(cart: CartDetailsEntity) {
        const subtotal = cart.cartItems.reduce((sum, item) => sum + item.quantity * Number(item.priceSnapshot), 0);
        const tax = subtotal * 0.1;
        const shippingFee = 30000;
        const total = subtotal + tax + shippingFee;
        return { subtotal, tax, shippingFee, total };
    }
 
    async getOrderSummary(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO> {
        try {
            const cart: CartDetailsEntity | null = await this.cartService.getCart(userId, dto.cartId);
            if (cart.cartItems.length === 0) {
                    throw new NotFoundException('Cart not found for this user.');
            };

            const { subtotal, tax, shippingFee, total } = this._calculateOrderTotals(cart);

            const orderItems = cart.cartItems.map(item => ({
                productVariantId: item.productVariantId,
                quantity: item.quantity, 
                unitPrice: Number(item.priceSnapshot),
                totalPrice: item.quantity * Number(item.priceSnapshot)
            }));

            const orderSummaryData = {
                id: null,
                userId: userId,
                cartId: cart.id,
                tax: tax,
                shippingFee: shippingFee,
                total: total,
                orderItems: orderItems
            };

            return plainToInstance(OrderResponseDTO, orderSummaryData, {
                excludeExtraneousValues: true
            });
            
        } catch (error) {
            console.error(`Error fetching cart for user`, error);
            
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
            throw error; // Re-throw the specific error
            }
            throw new BadRequestException('An unexpected error occurred during fetching cart.');
        }
    };

    async createOrder(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO> {
        try {
            const cart: CartDetailsEntity | null = await this.cartService.getCart(userId, dto.cartId);
            if (cart.cartItems.length === 0) {
                    throw new NotFoundException('Cart not found for this user.');
            };

            const { subtotal, tax, shippingFee, total } = this._calculateOrderTotals(cart);

            const orderItems = cart.cartItems.map(item => {
                return new OrderItemEntity(
                    null,
                    item.productVariantId,
                    item.quantity,
                    Number(item.priceSnapshot)
                );
            });

            const orderEntity = new OrderEntity(
                null,
                userId,
                cart.id,
                subtotal,
                tax,
                shippingFee,
                total,
                orderItems
            );

            const order = await this.orderRepo.createOrder(orderEntity);

            return plainToInstance(OrderResponseDTO, order, {
                excludeExtraneousValues: true,
            });

        } catch (error) {
            console.error(`Error fetching cart for user`, error);

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error; // Re-throw the specific error
            }
                throw new BadRequestException('An unexpected error occurred during fetching cart.');
        };
    };

    async getOrder(dto: GetOrderDTO): Promise<OrderResponseDTO> {
        try {
            const order = await this.orderRepo.getOrder(dto.id);
            if (!order || order.orderItems.length === 0) {
                throw new NotFoundException('Cart not found for this user.');
            }

            const orderItems = order.orderItems.map(item => {
                return new OrderItemEntity(
                    null,
                    item.productVariantId,
                    item.quantity,
                    Number(item.priceSnapshot)
                );
            });

            const orderEntity = new OrderEntity(
                order.id,
                order.userId,
                order.cartId,
                order.subtotal,
                order.tax,
                order.shippingFee,
                order.total,
                orderItems
            );

            return plainToInstance(OrderResponseDTO, orderEntity, {
                excludeExtraneousValues: true
            });
            
        } catch (error) {
            console.error(`Error fetching order for user`, error);

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error; // Re-throw the specific error
            }
                throw new BadRequestException('An unexpected error occurred during fetching order.');
        }; 
    };
}   