import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import { Address } from "@prisma/client";

@Injectable()
export class AddressRepo {
    constructor (
        private readonly prisma: PrismaService
    ) {}

    async create(address, userId): Promise<Address> {
        return this.prisma.address.create({
            data: {
                address: address.address,
                district: address.district,
                city: address.city,
                userId: userId
            }
        });
    };

    async find()
}