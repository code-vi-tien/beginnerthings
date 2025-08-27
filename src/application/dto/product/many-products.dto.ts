import { Expose } from "class-transformer";

export class ManyProductsDTO {
    @Expose()
    productVariantIds: string[];

    @Expose()
    productPriceSnapshotIds: string[];
}