import { AddressEntity } from 'src/domain/entities/address.entity';


export interface IAdressService {
    createAddress(address, userId: string): Promise<AddressEntity>;
}