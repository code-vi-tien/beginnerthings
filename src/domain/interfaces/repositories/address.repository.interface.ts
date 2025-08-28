import { AddressEntity, AddressResponseEntity } from "src/domain/entities/address.entity";

export interface IAddressRepo {
    create(address: AddressEntity): Promise<AddressResponseEntity>;
}