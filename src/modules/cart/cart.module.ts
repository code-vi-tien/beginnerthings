import { Module } from '@nestjs/common';
import { CartController } from '../../presentation/controllers/cart/cart.controller';
import { CartService } from '../../application/services/cart/cart.service';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { CartRepo } from '../../infrastructure/repositories/cart.repository';

@Module({
    controllers: [CartController],
    providers: [CartService, CartRepo],
    imports: [PrismaModule],
    exports: [CartService],
})
export class CartModule {}
