export class OrderEntity {
    constructor (
        public readonly id: string,
        public readonly userId: string,
        public readonly cartId: string,
        public readonly subtotal: number,
        public readonly tax: number,
        public readonly shippingFee: number,
        public readonly total: number,
        public readonly orderItems: OrderItemEntity[]
    ) {}
}

export class OrderItemEntity {
  constructor(
    public readonly id: string,
    public readonly productVariantId: string | null,
    public readonly quantity: number,
    public readonly priceSnapshot: number,
    public readonly updatedAt: Date
  ) {}
}