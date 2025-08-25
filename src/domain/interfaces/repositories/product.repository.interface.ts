export interface IProductRepo {
    findProduct(productId: string);

    findManyProducts(productVariantIds: any[]);
}