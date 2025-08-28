import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Payment } from "@prisma/client";
import { IPaymentRepo } from "src/domain/interfaces/repositories/payment.repository.interface";
import { PaymentEntity } from "src/domain/entities/payment.entity";

@Injectable()
export class PaymentRepo implements IPaymentRepo{
    constructor(private prisma: PrismaService) {}

    async createPayment(paymentEntity: PaymentEntity): Promise<Payment> {
        return await this.prisma.payment.create({
            data: {
                userId: paymentEntity.userId,
                orderId: paymentEntity.orderId,
                addressId: paymentEntity.addressId,
                amount: paymentEntity.total
            } 
        });
    };
}   