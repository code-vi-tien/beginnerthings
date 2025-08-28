import { CartResponseDTO } from '../../../application/dto/cart/cart.response.dto';
import { CartItemDTO, CartItemResponseDTO } from 'src/application/dto/cart/cart-item.dto';


export interface ICartService {
    addItem(userId: string, dto: CartItemDTO): Promise<CartItemResponseDTO>;
    
    getCart(userId: string, cartId: string): Promise<CartResponseDTO>;

    removeItem(userId: string, cartItemId: string): Promise<CartItemResponseDTO>;
}