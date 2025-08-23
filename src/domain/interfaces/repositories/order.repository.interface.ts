import { OrderEntity } from 'src/domain/entities/order.entity';

 export interface IOrderRepo {
    createOrder(orderEntity: OrderEntity): Promise<OrderEntity>;
 }