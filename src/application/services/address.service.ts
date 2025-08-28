import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { AddressEntity } from "src/domain/entities/address.entity";
import { IAdressService } from "src/domain/interfaces/services/address.service.interface";
import { AddressRepo } from "src/infrastructure/repositories/address.repository";
import { AddressReponseDTO, CreateAddressDTO } from "../dto/address/address.dto";

@Injectable()
export class AddressService implements IAdressService {
    constructor (
        private readonly addressRepo: AddressRepo
    ) {}

    async createAddress(userId: string, dto: CreateAddressDTO): Promise<AddressReponseDTO> {
        const addressEntity = new AddressEntity(
            userId,
            dto.address,
            dto.district,
            dto.city
        )
        const response = this.addressRepo.create(addressEntity);
        return plainToInstance(AddressEntity, response);
    };

    async getAddress(userId: string): Promise<AddressReponseDTO> {
        let addressEntity = new AddressEntity(
            userId,
            null,
            null,
            null
        );

        addressEntity = await this.addressRepo.get(addressEntity);

        return plainToInstance(AddressReponseDTO, addressEntity);
    };
}