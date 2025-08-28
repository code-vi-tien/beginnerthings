export class AddressEntity {
    constructor (
        public readonly userId: string,
        public readonly address: string,
        public readonly district: string,
        public readonly city: string
    ) {};
}
export class AddressResponseEntity {
    constructor (
        public readonly id: string,
        public readonly userId: string,
        public readonly address: string,
        public readonly district: string,
        public readonly city: string
    ) {};

    get shippingFee(): number {
        const fee = 30000;
        /* 
    Logic of getting shipping fee based on the distant or 
    sending request for the current shipping fee via an external service API
        */
    return fee 
    };
}