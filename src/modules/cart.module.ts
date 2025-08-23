import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { CartRepo } from '../infrastructure/repositories/cart.repository';
import { CartService } from 'src/application/services/cart.service';
import { CartController } from 'src/presentation/controllers/cart.controller';

@Module({
    controllers: [CartController],
    providers: [CartService, CartRepo],
    imports: [PrismaModule],
    exports: [CartService],
})
export class CartModule {}
