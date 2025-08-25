import { ItemDTO } from '../../../application/dto/item/item.dto';
import { CartResponseDTO } from '../../../application/dto/cart/cart.response.dto';
import { CartItemResponseDTO } from 'src/application/dto/cart/cart-item.dto';


export interface IProductService {
    findProductVariant(dto: ItemDTO);

    findProducts(productVariantIds: any[]);

    findProductPrices(productVariantIds: any[], updatedAt: any[]);
} 