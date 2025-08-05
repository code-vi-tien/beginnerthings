import { Injectable } from "@nestjs/common";
import { OrderRepo } from "./order.repository";
import { CartRepo } from "../cart/cart.repository";

@Injectable()
export class OrderService {
    constructor(
        private orderRepo: OrderRepo,
        private cartRepo: CartRepo
    ) {}

    async getOrder(userId) {
        cart = await this.cartRepo.getCart(userId);
        
    }
}