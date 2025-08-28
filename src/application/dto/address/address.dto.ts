import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class CreateAddressDTO {
    @Expose()
    @IsString()
    address: string;

    @Expose()
    @IsString()
    district: string;

    @Expose()
    @IsString()
    city: string;   
}

export class AddressReponseDTO {}