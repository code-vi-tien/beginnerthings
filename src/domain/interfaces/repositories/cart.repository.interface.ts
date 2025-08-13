import { CartItem } from '@prisma/client';
import { CartDetailsEntity } from 'src/domain/entities/cart-details.entity';


export interface ICartRepo {
    createCart(userId);
    
    findCartByUserId(userId);

    upsertCart(cartId, dto);

    getCartDetails(userId: string): Promise<CartDetailsEntity>;
    
    findItem(cartItemId: string): Promise<CartItem>;

    removeCartItem(userId: string, cartItemId: string): Promise<CartItem>;
} 