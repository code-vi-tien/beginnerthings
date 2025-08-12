import { Module } from '@nestjs/common';
import { OrderController } from '../../presentation/controllers/order/order.controller';
import { OrderService } from '../../application/services/order/order.service';
import { OrderRepo } from '../../infrastructure/repositories/order.repository';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';

@Module({
    controllers: [OrderController],
    providers: [OrderService, OrderRepo],
    imports: [PrismaModule],
    exports: [OrderService]
})
export class OrderModule {}
