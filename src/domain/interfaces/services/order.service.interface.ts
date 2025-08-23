import { CreateOrderDTO } from "src/application/dto/order/create-order.dto";
import { OrderResponseDTO } from "src/application/dto/order/order.response.dto";

export interface IOrderService {
    getSummary(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO>;

    createOrder(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO>;
}