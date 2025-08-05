import { Cart, CartItem } from '@prisma/client';
import { CartItemDTO } from '../dto/cart-item.dto';


export interface ICartRepo {
    createCart(userId);
    
    findCartByUserId(userId);

    upsertCart(cartId, dto);

    getCart(userId: string): Promise<Cart>;
    
    removeCartItem(userId: string, cartItemId: string): Promise<CartItem>;
}