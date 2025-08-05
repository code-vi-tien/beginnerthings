import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepo } from './order.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [OrderController],
    providers: [OrderService, OrderRepo],
    imports: [PrismaModule],
    exports: [OrderService]
})
export class OrderModule {}
