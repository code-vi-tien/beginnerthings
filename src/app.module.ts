import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './modules/cart.module';
import { PaymentModule } from './modules/payment.module';
import { UserModule } from './modules/user.module';
import { ProductModule } from './modules/product.module';
import { OrderModule } from './modules/order.module';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';

@Module({
  imports: [CartModule, PaymentModule, UserModule, ProductModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
