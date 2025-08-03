import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartRepo } from './cart.repository';

@Module({
    controllers: [CartController],
    providers: [CartService, CartRepo],
    imports: [PrismaModule],
    exports: [CartService],
})
export class CartModule {}
