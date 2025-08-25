import { BadRequestException, Injectable, NotFoundException, Req } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { CreatePaymentDTO } from "src/application/dto/payment/create-payment.dto";
import { PaymentResponseDTO } from "../dto/payment/payment.response.dto";

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

    async execute(userId: string, dto: CreatePaymentDTO): Promise<PaymentResponseDTO> {
        try {
            // Get order
            const order = await this.orderService.getOrder(dto.orderId);
            if (!order || order.orderItems.length === 0) {
                    throw new NotFoundException('Order not found for this user.');
            };

            //Validate order items
            let isNotItem = this.orderService.validateOrder(dto.orderId);
            if (isNotItem) {
                throw new BadRequestException(`Order with id: ${isNotItem} is invalid`)
            };

            // Initatiate payment
            const payment = await this.paymentRepo.createPayment(userId, order);

            return plainToInstance(PaymentResponseDTO, payment);

        } catch (error) {
            console.error(`Error fetching order for user`, error);

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error; // Re-throw the specific error
            }
                throw new BadRequestException('An unexpected error occurred during fetching order.');
        }
    };
}  