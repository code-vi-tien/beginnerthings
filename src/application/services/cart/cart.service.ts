import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ItemDTO } from '../../dto/item/item.dto';
import { CartResponseDTO } from '../../dto/cart/cart.response.dto';
import { CartItemResponseDTO } from 'src/application/dto/cart/cart-item.dto';

import { ICartRepo } from '../../../domain/interfaces/repositories/cart.repository.interface';
import { ICartService } from '../../../domain/interfaces/services/cart.service.interface';
import { IProductService } from 'src/domain/interfaces/services/product.service.interface';

@Injectable()
export class CartService implements ICartService{
  constructor(
    private readonly cartRepo: ICartRepo,
    private readonly productService: IProductService
  ) {}
  
  async addItem(userId: string, dto: ItemDTO): Promise<CartItemResponseDTO> {
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

  async getCart(userId): Promise<CartResponseDTO> {
    try {
      let cart = await this.cartRepo.findCartByUserId(userId);
      if (!cart) {
        cart = await this.cartRepo.createCart(userId);
      }

      cart = await this.cartRepo.getCartDetails(userId);

      return plainToInstance(CartResponseDTO, cart, {
      excludeExtraneousValues: true,
      });

    } catch (error) {
      console.error(`Error fetching cart for user`, error);

      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; // Re-throw the specific error
      }
        throw new BadRequestException('An unexpected error occurred during fetching cart.');
    }
  };

  async removeItem(userId: string, cartItemId: string): Promise<CartItemResponseDTO> {
    try {
      let cartItem = await this.cartRepo.findItem(cartItemId);
      if (!cartItem) {
        throw new BadRequestException(`There's no item id: ${cartItemId} in your cart`);
      }
      cartItem = await this.cartRepo.removeCartItem(userId, cartItemId);

      return new CartItemResponseDTO(cartItem);

    } catch (error) {
      console.error(`Error removing item from cart for user`, error);

      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; // Re-throw the specific error
      }
        throw new BadRequestException('An unexpected error occurred during removing item from cart.');
    }
  };
}