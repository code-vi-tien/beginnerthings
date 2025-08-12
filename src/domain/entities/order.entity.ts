export class OrderEntity {
    constructor (
        public readonly id: string,
        public readonly userId: string,
        public readonly cartId: string,
        public readonly status: string,
        public readonly orderItems: any[]
    ) {}

    get subtotal(): number {
    return this.orderItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    }
}