export class ProductEntity {
    constructor(
    public readonly id: string,
    public readonly productVariantId: string | null,
    public readonly priceSnapshotId: string,
    public readonly quantity: number,
    public readonly priceSnapshot: number,
  ) {}
}