import { Expose } from "class-transformer";

export class CartItemResponseDTO {
  @Expose()
  id: string;

  @Expose()
  productId: string;

  @Expose()
  quantity: number;

  @Expose()
  variant?: string;

  constructor(partial: Partial<CartItemResponseDTO>) {
    Object.assign(this, partial)
  }
}