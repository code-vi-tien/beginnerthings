import { CreateOrderDTO } from "src/application/dto/order/create-order.dto";
import { GetOrderDTO } from "src/application/dto/order/get-order.dto";
import { OrderResponseDTO } from "src/application/dto/order/order.response.dto";

export interface IOrderService {
    getOrderSummary(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO>;

    createOrder(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO>;

    getOrder(orderId: string): Promise<OrderResponseDTO>;

    validateOrder(orderId: string);
}