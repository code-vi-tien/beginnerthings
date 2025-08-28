export class CartItemEntity {
    constructor(
    public readonly productVariantId: string | null,
    public readonly quantity: number,
    public readonly priceSnapshotId: string
  ) {}
}