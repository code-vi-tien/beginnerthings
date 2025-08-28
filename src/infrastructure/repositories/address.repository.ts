import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import { Address } from "@prisma/client";
import { AddressEntity, AddressResponseEntity } from "src/domain/entities/address.entity";

@Injectable()
export class AddressRepo {
    constructor (
        private readonly prisma: PrismaService
    ) {}

    async create(addressEntity: AddressEntity): Promise<AddressResponseEntity> {
        const data = await this.prisma.address.create({
            data: {
                address: addressEntity.address,
                district: addressEntity.district,
                city: addressEntity.city,
                userId: addressEntity.userId
            }
        });

        return new AddressResponseEntity(
            data.id,
            data.userId,
            data.address,
            data.district,
            data.city
        )
    };

    async get(addressEntity: AddressEntity): Promise<AddressResponseEntity> {
        const address = await this.prisma.address.findFirst({
            where: {
                userId: addressEntity.userId
            }
        });

        return new AddressResponseEntity(
            address.id,
            address.userId,
            address.address,
            address.district,
            address.city
        );
    };
}