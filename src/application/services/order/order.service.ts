import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderRepo } from "../../../infrastructure/repositories/order.repository";
import { CartRepo } from "../../../infrastructure/repositories/cart.repository";
import { OrderResponseDTO } from "../../dto/order/order.dto";
import { plainToInstance } from "class-transformer";
import { CartDetailsEntity } from "src/domain/entities/cart-details.entity";

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepo: OrderRepo,
        private readonly cartRepo: CartRepo
    ) {}

    async getSummary(userId: string) {
        const cart: CartDetailsEntity | null = await this.cartRepo.getCartDetails(userId);
        if (!cart || cart.cartItems.length === 0) {
                throw new NotFoundException('Cart not found for this user.');
        }
        
        let subtotal = 0
        const items = cart.cartItems.map(item => {
            const itemTotal = item.quantity * Number(item.priceSnapshot)
            subtotal += itemTotal

            return {
                productVariantId: item.productVariantId,
                quantity: item.quantity,
                unitPrice: item.priceSnapshot,
                totalPrice: itemTotal,
            };
        });

        const taxAmount = subtotal * 0.1;
        const shippingAmount = subtotal > 500000 ? 0 : 30000 //30k shipping fee
        const totalAmount = subtotal + taxAmount + shippingAmount;

        return {
            subtotal,
            taxAmount,
            shippingAmount,
            totalAmount,
            items
        }
    };

    async createOrder(userId) {
        const summary = this.getSummary(userId);

        const order = await this.orderRepo.createOrder(
            userId,
            summary
        );

        return plainToInstance(OrderResponseDTO, order, {
            excludeExtraneousValues: true,
        });
    };
}  