import { Injectable } from '@nestjs/common';
import { CartRepo } from './cart.repository';
import { plainToInstance } from 'class-transformer';

import { CartItemDTO } from './dto/cart-item.dto';
import { CartItemResponseDTO } from './dto/cart-item.response.dto';

import { GetCartResponseDTO } from './dto/get-cart.response.dto';
import { RemoveItemResponseDTO } from './dto/remove-item.response.dto';


@Injectable()
export class CartService {
  constructor(private cartRepo: CartRepo) {}
  
  async addItemToCart(userId: string, dto: CartItemDTO): Promise<CartItemResponseDTO> {
    const cartItem = await this.cartRepo.upsertCart(userId, dto);
    return new CartItemResponseDTO(cartItem);
  };

  async getCart(userId): Promise<GetCartResponseDTO> {
    const cart = await this.cartRepo.getCart(userId);
    return plainToInstance(GetCartResponseDTO, cart, {
      excludeExtraneousValues: true,
    });
  };

  async removeItem(userId: string, cartItemId: string): Promise<RemoveItemResponseDTO> {
    const cartItem = await this.cartRepo.removeCartItem(userId, cartItemId);
    return new CartItemResponseDTO(cartItem);
  };
}