import { Controller, Get, Post, Req } from "@nestjs/common";
import { CreateOrderDTO } from "src/application/dto/order/create-order.dto";
import { OrderResponseDTO } from "src/application/dto/order/order.response.dto";
import { IOrderService } from "src/domain/interfaces/services/order.service.interface";


@Controller('order')
export class OrderController {
    constructor(private orderService: IOrderService) {}

    @Get('summary')
    async getCheckoutsummary(@Req() req, dto: CreateOrderDTO) {
        const userId = req.user.id;
        return this.orderService.getSummary(userId, dto);
    }

    @Post('create-order')
    async checkOut(@Req() req, dto: CreateOrderDTO) {
        const userId = req.user.id;
        const order = await this.orderService.createOrder(userId, dto);
        return {
            "success": true,
            order
        };
    };
}