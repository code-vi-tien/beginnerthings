import { Expose } from "class-transformer";

export class RemoveItemResponseDTO {
  @Expose()
  id: string;

  @Expose()
  productVariantId: string;

  @Expose()
  quantity: number;

  @Expose()
  variant?: string;

  constructor(partial: Partial<RemoveItemResponseDTO>) {
    Object.assign(this, partial)
  }
}