import { CreateOrderDTO } from "src/application/dto/order/create-order.dto";
import { OrderResponseDTO } from "src/application/dto/order/order.response.dto";
import { ValidateOrderDTO } from "src/application/dto/order/validate-order.dto";

export interface IOrderService {
    getOrderSummary(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO>;

    createOrder(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO>;

    getOrder(orderId: string): Promise<OrderResponseDTO>;

    validateOrder(dto: ValidateOrderDTO);
}