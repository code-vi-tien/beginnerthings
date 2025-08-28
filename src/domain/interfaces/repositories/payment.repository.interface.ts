 import { Payment } from '@prisma/client';
import { PaymentEntity } from 'src/domain/entities/payment.entity';

 export interface IPaymentRepo {
    createPayment(paymentEntity: PaymentEntity): Promise<Payment>;
 }