import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { AddressEntity } from "src/domain/entities/address.entity";
import { IAdressService } from "src/domain/interfaces/services/address.service.interface";
import { AddressRepo } from "src/infrastructure/repositories/address.repository";

@Injectable()
export class AddressService implements IAdressService {
    constructor (
        private readonly addressRepo: AddressRepo
    ) {}

    async createAddress(address, orderId: string): Promise<AddressEntity> {
        const response = this.addressRepo.create(address, orderId);
        return plainToInstance(AddressEntity, response);
    }
}