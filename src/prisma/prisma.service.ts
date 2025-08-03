import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect(); // Connect to ORM when server starts
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}