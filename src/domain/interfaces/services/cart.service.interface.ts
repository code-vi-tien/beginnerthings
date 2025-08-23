import { ItemDTO } from '../../../application/dto/item/item.dto';
import { CartResponseDTO } from '../../../application/dto/cart/cart.response.dto';
import { CartItemResponseDTO } from 'src/application/dto/cart/cart-item.dto';


export interface ICartService {
    addItem(userId: string, dto: ItemDTO): Promise<CartItemResponseDTO>;
    
    getCart(userId: string, cartId: string): Promise<CartResponseDTO>;

    removeItem(userId: string, cartItemId: string): Promise<CartItemResponseDTO>;
}