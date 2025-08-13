 import { Cart, CartItem, Order } from '@prisma/client';
 import { CartItemDTO } from '../../../application/dto/item/item.dto';
 import { CartDetailsEntity } from 'src/domain/entities/cart-details.entity';
 
 
 export interface IOrderRepo {
     createCart(userId): Promise<Order>;
 }