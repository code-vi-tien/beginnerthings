import { AddressReponseDTO, CreateAddressDTO } from 'src/application/dto/address/address.dto';
import { AddressEntity } from 'src/domain/entities/address.entity';


export interface IAdressService {
    createAddress(userId: string, dto: CreateAddressDTO): Promise<AddressReponseDTO>;

    getAddress(userId: string): Promise<AddressReponseDTO>;
}