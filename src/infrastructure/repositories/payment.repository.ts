import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Payment } from "@prisma/client";
import { IPaymentRepo } from "src/domain/interfaces/repositories/payment.repository.interface";

@Injectable()
export class PaymentRepo implements IPaymentRepo{
    constructor(private prisma: PrismaService) {}

    async createPayment(userId: string, orderData): Promise<Payment> {
        return await this.prisma.payment.create({
            data: {
                userId: userId,
                orderId: orderData.id,
                address: orderData.address,
                amount: orderData.totalAmount
            }
        });
    };
}   