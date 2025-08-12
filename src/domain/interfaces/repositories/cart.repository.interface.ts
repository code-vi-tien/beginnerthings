import { Cart, CartItem } from '@prisma/client';
import { CartItemDTO } from '../../../application/dto/cart/cart-item.dto';
import { CartDetailsEntity } from 'src/domain/entities/cart-details.entity';


export interface ICartRepo {
    createCart(userId);
    
    findCartByUserId(userId);

    upsertCart(cartId, dto);

    getCartDetails(userId: string): Promise<CartDetailsEntity>;
    
    removeCartItem(userId: string, cartItemId: string): Promise<CartItem>;
}