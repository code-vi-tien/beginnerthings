import { ManyProductsDTO } from "src/application/dto/product/many-products.dto";
import { ProductDTO } from "src/application/dto/product/product.dto";

export interface IProductService {
    findProductVariant(dto: ProductDTO);

    findProducts(dto: ManyProductsDTO);

    findProductPrices(dto: ManyProductsDTO);
} 