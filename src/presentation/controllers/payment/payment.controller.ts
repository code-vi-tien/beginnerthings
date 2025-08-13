import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { PaymentResponseDTO } from "src/application/dto/payment/create-payment.dto";
import { PaymentService } from "src/application/services/payment/payment.service";

@Controller('payment')
export class OrderController {
    constructor(private paymentService: PaymentService) {}

    @Post()
    async createPayment(@Body() createPaymentDTO: PaymentResponseDTO, @Req() req) {
        const ipAddress = req.ip || req.connection.remoteAddress || '127.0.0.1';

        const paymentResponse = await this.paymentService.execute(
            ipAddress,
            createPaymentDTO.userId,

        );
    };
}  