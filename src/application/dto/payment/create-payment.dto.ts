import { Expose, Transform, Type } from "class-transformer";

export class PaymentResponseDTO {
    @Expose()
    userId: string;
} 