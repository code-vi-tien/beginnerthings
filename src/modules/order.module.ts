import { Module } from '@nestjs/common';
import { OrderController } from '../presentation/controllers/order.controller';
import { OrderRepo } from '../infrastructure/repositories/order.repository';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { OrderService } from 'src/application/services/order.service';

@Module({
    controllers: [OrderController],
    providers: [OrderService, OrderRepo],
    imports: [PrismaModule],
    exports: [OrderService]
})
export class OrderModule {}
