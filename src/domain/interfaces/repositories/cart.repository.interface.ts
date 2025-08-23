import { CartItem } from '@prisma/client';
import { ItemDTO } from 'src/application/dto/item/item.dto';
import { CartDetailsEntity } from 'src/domain/entities/cart-details.entity';


export interface ICartRepo {
    createCart(userId: string);
    
    findCart(cartId: string);

    findCartByUserId(userId: string);

    upsertCart(cartId: string, dto: ItemDTO);

    getCartDetails(userId: string): Promise<CartDetailsEntity>;
    
    findItem(cartItemId: string): Promise<CartItem>;

    removeCartItem(userId: string, cartItemId: string): Promise<CartItem>;
} 