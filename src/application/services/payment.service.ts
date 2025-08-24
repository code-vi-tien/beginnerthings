import { Body, Injectable, NotFoundException, Req } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { createPaymentDTO } from "src/application/dto/payment/create-payment.dto";

import { IOrderService } from "src/domain/interfaces/services/order.service.interface";
import { IAdressService } from "src/domain/interfaces/services/address.service.interface";

import { IPaymentRepo } from "src/domain/interfaces/repositories/payment.repository.interface";

@Injectable()
export class PaymentService {
    constructor(
        private readonly orderService: IOrderService,
        private readonly paymentRepo: IPaymentRepo,
        private readonly addressService: IAdressService
    ) {};

    async execute(userId: string, dto: createPaymentDTO): Promise<PaymentResponseDTO> {
        // Get order
        const order = await this.orderService.getOrder(userId);
        if (!order || order.orderItems.length === 0) {
                throw new NotFoundException('Order not found for this user.');
        }
        
        // Calculate cost
        const addressData = order.address;
        const address = await this.addressService.createAddress(addressData, userId);
        
        let subtotal = order.subtotal;
        const taxAmount = subtotal * 0.1;
        const shippingAmount = address.shippingFee;
        const totalAmount = subtotal + taxAmount + shippingAmount;

        // Initatiate payment
        const payment = await this.paymentRepo.createPayment(userId, order);

            // Call banking API

            // Call transportation API

        return plainToInstance(PaymentResponseDTO, payment);
    };
}  