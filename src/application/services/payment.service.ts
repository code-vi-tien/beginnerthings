import { BadRequestException, Injectable, NotFoundException, Req } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { CreatePaymentDTO } from "src/application/dto/payment/create-payment.dto";
import { PaymentResponseDTO } from "../dto/payment/payment.response.dto";

import { IOrderService } from "src/domain/interfaces/services/order.service.interface";
import { IAdressService } from "src/domain/interfaces/services/address.service.interface";

import { IPaymentRepo } from "src/domain/interfaces/repositories/payment.repository.interface";
import { GetOrderDTO } from "../dto/order/get-order.dto";
import { ValidateOrderDTO } from "../dto/order/validate-order.dto";
import { PaymentEntity } from "src/domain/entities/payment.entity";

@Injectable()
export class PaymentService {
    constructor(
        private readonly orderService: IOrderService,
        private readonly paymentRepo: IPaymentRepo,
        private readonly addressService: IAdressService
    ) {};

    async execute(userId: string, dto: CreatePaymentDTO): Promise<PaymentResponseDTO> {
        try {
            // Get address and orderId
            const address = await this.addressService.getAddress(userId);

            // Mapping from CreatePaymentDTO to GetOrderDTO
            const orderDTO = new GetOrderDTO;
            orderDTO.id = dto.orderId;
            // Get order
            const order = await this.orderService.getOrder(orderDTO);
            if (!order || order.orderItems.length === 0) {
                    throw new NotFoundException('Order not found or is empty.');
            };

            //Validate order items
                // Mapping from OrderResponseDTO to ValidateOrderDTO
            const validateOrderDTO = new ValidateOrderDTO;
            validateOrderDTO.id = order.id;
            
            const isValid = await this.orderService.validateOrder(validateOrderDTO);
            if (!isValid) {
                throw new BadRequestException(`Order is invalid due to price or product mismatch.`)
            };

            // Retrieve address


            // Initatiate payment
            const paymentEntity = new PaymentEntity(
                userId,
                dto.orderId,
                dto.orderId,
                order.total
            )
            const payment = await this.paymentRepo.createPayment(paymentEntity);

            return plainToInstance(PaymentResponseDTO, payment);

        } catch (error) {
            console.error(`Error processing payment for user`, error);

            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error; // Re-throw the specific error
            }
                throw new BadRequestException('An unexpected error occurred during payment.');
        };
    };
}  