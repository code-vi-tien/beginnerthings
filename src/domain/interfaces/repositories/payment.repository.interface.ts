 import { Payment } from '@prisma/client';

 export interface IPaymentRepo {
    createPayment(userId: string, orderData): Promise<Payment>;
 }