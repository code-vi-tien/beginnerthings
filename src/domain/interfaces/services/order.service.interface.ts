import { CreateOrderDTO } from "src/application/dto/order/create-order.dto";
import { GetOrderDTO } from "src/application/dto/order/get-order.dto";
import { OrderResponseDTO } from "src/application/dto/order/order.response.dto";
import { ValidateOrderDTO } from "src/application/dto/order/validate-order.dto";

export interface IOrderService {
    getOrderSummary(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO>;

    createOrder(userId: string, dto: CreateOrderDTO): Promise<OrderResponseDTO>;

    getOrder(dto: GetOrderDTO): Promise<OrderResponseDTO>;

    validateOrder(dto: ValidateOrderDTO);
}