import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CartItemDTO } from './dto/cart-item.dto';
import { CartItemResponseDTO } from './dto/cart-item.response.dto';
import { GetCartResponseDTO } from './dto/get-cart.response.dto';
import { RemoveItemResponseDTO } from './dto/remove-item.response.dto';

import { ICartRepo } from './interface/cart.repository.interface';
import { ICartService } from './interface/cart.service.interface';
import { ProductService } from '../product/product.service';


@Injectable()
export class CartService implements ICartService{
  constructor(
    private readonly cartRepo: ICartRepo,
    private readonly productService: ProductService
  ) {}
  
  async addItemToCart(userId: string, dto: CartItemDTO): Promise<CartItemResponseDTO> {
    try {
      const productVariant = await this.productService.findProductVariant(dto);
      /* Simple request validation */
      if (dto.quantity <= 0) {
        throw new BadRequestException('Quantity must be a positive number.');
      }
      if (dto.quantity > productVariant.stock ) {
        throw new BadRequestException(`Not enough stock available`);
      }
      /* Validate cart and cart items */
      let cart = await this.cartRepo.findCartByUserId(userId);
      if (!cart) {
        cart = await this.cartRepo.createCart(userId);
      }

      const cartItem = await this.cartRepo.upsertCart(cart.id, dto);

      return new CartItemResponseDTO(cartItem);

    } catch (error) {
      console.error(`Error adding item to cart for user ${userId}:`, error);

      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; // Re-throw the specific error
      }
        throw new BadRequestException('An unexpected error occurred during cart update.');
      }
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