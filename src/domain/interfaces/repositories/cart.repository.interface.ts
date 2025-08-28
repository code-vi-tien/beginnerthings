import { CartItem } from '@prisma/client';
import { CartDetailsEntity } from 'src/domain/entities/cart-details.entity';
import { CartItemEntity } from 'src/domain/entities/cart-item.entity';

export interface ICartRepo {
    createCart(userId: string);
    
    findCart(cartId: string);

    findCartByUserId(userId: string);

    upsertCart(cartId: string, item: CartItemEntity);

    getCartDetails(userId: string): Promise<CartDetailsEntity>;
    
    findItem(cartItemId: string): Promise<CartItem>;

    removeCartItem(userId: string, cartItemId: string): Promise<CartItem>;
} 