import { Expose } from "class-transformer";
import { IsString } from "class-validator";


export class GetOrderDTO {
    @Expose()
    @IsString()
    id: string;
}