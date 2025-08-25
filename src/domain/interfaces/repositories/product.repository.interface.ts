export interface IProductRepo {
    findProduct(productId: string);

    findManyProducts(productVariantIds: any[]);

    findProductPriceSnapshot(productVariantIds: any[], updatedTime: any[]);
}