export class PaymentEntity {
    constructor (
        public readonly userId: string,
        public readonly orderId: string,
        public readonly addressId: string,
        public readonly total: number
    ) {}
}