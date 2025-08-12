import { Cart, CartItem } from '@prisma/client';
import { CartItemDTO } from '../../../application/dto/cart/cart-item.dto';
import { CartItemResponseDTO } from '../../../application/dto/cart/cart-item.response.dto';
import { CartResponseDTO } from '../../../application/dto/cart/cart.response.dto';
import { RemoveItemResponseDTO } from '../../../application/dto/cart/remove-item.response.dto';


export interface ICartService {
    addItemToCart(userId: string, dto: CartItemDTO): Promise<CartItemResponseDTO>;
    
    getCart(userId): Promise<CartResponseDTO>;

    removeItem(userId: string, cartItemId: string): Promise<RemoveItemResponseDTO>;
}