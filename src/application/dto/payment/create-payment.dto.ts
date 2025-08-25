import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class CreatePaymentDTO {
    @Expose()
    @IsString()
    orderId: string;
} 

