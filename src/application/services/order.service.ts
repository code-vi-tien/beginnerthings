import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { CartDetailsEntity } from "src/domain/entities/cart-details.entity";
import { OrderEntity, OrderItemEntity } from "src/domain/entities/order.entity";

import { OrderResponseDTO } from "../dto/order/order.response.dto";
import { CreateOrderDTO } from "../dto/order/create-order.dto";
import { ValidateOrderDTO } from "../dto/order/validate-order.dto";
import { GetOrderDTO } from "../dto/order/get-order.dto";
import { ManyProductsDTO } from "../dto/product/many-products.dto";
import { ManyProductsResponseDTO } from "../dto/product/many-product.response.dto";

import { IOrderService } from "src/domain/interfaces/services/order.service.interface";
import { ICartService } from "src/domain/interfaces/services/cart.service.interface";
import { IProductService } from "src/domain/interfaces/services/product.service.interface";
import { IOrderRepo } from "src/domain/interfaces/repositories/order.repository.interface";

@Injectable()
export class OrderService implements IOrderService{
    constructor(
        private readonly orderRepo: IOrderRepo,
        private readonly cartService: ICartService,
        private readonly productService: IProductService
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
            const cart = await this.cartService.getCart(userId, dto.cartId);

            const { subtotal, tax, shippingFee, total } = this._calculateOrderTotals(cart);

            const orderItems = cart.cartItems.map(item => ({
                productVariantId: item.productVariant.id,
                quantity: item.quantity, 
                unitPrice: item.priceSnapshot,
                totalPrice: item.quantity * item.priceSnapshot
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
            const cart = await this.cartService.getCart(userId, dto.cartId);

            const { subtotal, tax, shippingFee, total } = this._calculateOrderTotals(cart);

            const orderItems = cart.cartItems.map(item => {
                return new OrderItemEntity(
                    null,
                    item.productVariant.id,
                    item.priceSnapshotId,
                    item.quantity,
                    item.priceSnapshot
                );
            });

            const orderEntity = new OrderEntity(
                null,
                cart.userId,
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
                    item.priceSnapshotId,
                    item.quantity,
                    item.priceSnapshot
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

    async validateOrder(dto: ValidateOrderDTO): Promise<boolean> {
        try {
            // Find order
            const order = await this.orderRepo.getOrder(dto.id);
            if (!order || order.orderItems.length) {
                throw new NotFoundException ('Order not found for this user.');
            }

            // Get and validate item price snapshot
            const productVariantIds = order.orderItems.map(item => item.productVariantId);
            const priceSnapshotIds = order.orderItems.map(item => item.priceSnapshotId);
            // Create a request DTO
            const manyProductsDTO = {
                productVariantIds,
                productPriceSnapshotIds: priceSnapshotIds
            };
            const productDTO = plainToInstance(ManyProductsDTO, manyProductsDTO);

            // Validate the prices
            const priceSnapshotsDTO: ManyProductsResponseDTO = await this.productService.findProductPrices(productDTO);

            const priceSnapshotsMap = new Map(priceSnapshotsDTO.productPriceSnapshots.map(s => [s.id, s]));

            const areValid = order.orderItems.every(item => {
                const priceSnapshot = priceSnapshotsMap.get(item.priceSnapshotId);

                return !!priceSnapshot
            });
            if (!areValid) {
                throw new BadRequestException('Items have invalid price references');
            };

            // Check if the total prices match
            const calculatedTotal = order.orderItems.reduce((sum, item) => {
                const priceSnapshot = priceSnapshotsMap.get(item.priceSnapshotId);
                return sum + (priceSnapshot.price * item.quantity);
            }, 0);

            // Using a small tolerance for floating-point comparison.
            const isTotalCorrect = Math.abs(calculatedTotal - order.total) < 0.01;
            if (!isTotalCorrect) {
                throw new BadRequestException('The calculated total does not match the order total.');
            }

            return true;

        } catch (error) {
            console.error(`Error fetching order for user`, error);

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error; // Re-throw the specific error
            }
                throw new BadRequestException('An unexpected error occurred during fetching order.');
        };
    };
}   