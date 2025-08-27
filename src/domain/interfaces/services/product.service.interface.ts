import { ItemDTO } from '../../../application/dto/item/item.dto';

export interface IProductService {
    findProductVariant(dto: ItemDTO);

    findProducts(productVariantIds: any[]);

    findProductPrices(productVariantIds: any[]);
} 