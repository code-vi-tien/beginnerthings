import { Cart, CartItem } from '@prisma/client';
import { CartItemDTO } from '../dto/cart-item.dto';
import { CartItemResponseDTO } from '../dto/cart-item.response.dto';
import { GetCartResponseDTO } from '../dto/get-cart.response.dto';
import { RemoveItemResponseDTO } from '../dto/remove-item.response.dto';


export interface ICartService {
    addItemToCart(userId: string, dto: CartItemDTO): Promise<CartItemResponseDTO>;
    
    getCart(userId): Promise<GetCartResponseDTO>;

    removeItem(userId: string, cartItemId: string): Promise<RemoveItemResponseDTO>;
}