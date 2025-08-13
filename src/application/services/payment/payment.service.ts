import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderRepo } from "../../../infrastructure/repositories/order.repository";
import { CartRepo } from "../../../infrastructure/repositories/cart.repository";
import { CartDetailsEntity } from "src/domain/entities/cart-details.entity";
import { PaymentResponseDTO } from "src/application/dto/payment/create-payment.dto";

@Injectable()
export class PaymentService {
    constructor(
        private readonly orderRepo: OrderRepo,
        private readonly cartRepo: CartRepo
    ) {}

    async execute(ipAddress: string, userId: string): Promise<PaymentResponseDTO> {
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

        return new PaymentResponseDTO;
    };
}  