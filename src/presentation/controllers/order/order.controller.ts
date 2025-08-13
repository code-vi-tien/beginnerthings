import { Controller, Get, Post, Req } from "@nestjs/common";
import { OrderService } from "../../../application/services/order/order.service";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get('summary')
    async getCheckoutsummary(@Req() req) {
        const userId = req.user.id;
        return this.orderService.getSummary(userId);
    }

    @Post()
    async checkOut(@Req() req) {
        const userId = req.user.id;
        const order = await this.orderService.createOrder(userId);
        return {
            success: true,
            order: order.id,
            totalAmount: order.total
        };
    };
}