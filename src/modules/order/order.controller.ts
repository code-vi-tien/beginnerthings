import { Controller, Get, Req } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get()
    async checkOut(@Req() req) {
        const userId = req.user.id;
        return await this.orderService.getOrder(userId);
    }
}