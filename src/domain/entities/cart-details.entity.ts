export class CartDetailsEntity {
    constructor (
        public readonly id: string,
        public readonly userId: string,
        public readonly cartItems: any[]
    ) {}

    get subtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    }
}