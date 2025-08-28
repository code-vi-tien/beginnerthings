import { Expose, Type } from "class-transformer";
import { IsString } from "class-validator";


export class CreateOrderDTO {
    @Expose()
    @IsString()
    cartId: string;

    @Expose()
    @IsString()
    address: string;
}