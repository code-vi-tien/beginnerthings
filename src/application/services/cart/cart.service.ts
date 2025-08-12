import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CartItemDTO } from '../../dto/cart/cart-item.dto';
import { CartItemResponseDTO } from '../../dto/cart/cart-item.response.dto';
import { CartResponseDTO } from '../../dto/cart/cart.response.dto';
import { RemoveItemResponseDTO } from '../../dto/cart/remove-item.response.dto';

import { ICartRepo } from '../../../domain/interfaces/repositories/cart.repository.interface';
import { ICartService } from '../../../domain/interfaces/services/cart.service.interface';
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

  async getCart(userId): Promise<CartResponseDTO> {
    const cart = await this.cartRepo.getCartDetails(userId);
    return plainToInstance(CartResponseDTO, cart, {
      excludeExtraneousValues: true,
    });
  };

  async removeItem(userId: string, cartItemId: string): Promise<RemoveItemResponseDTO> {
    const cartItem = await this.cartRepo.removeCartItem(userId, cartItemId);
    return new CartItemResponseDTO(cartItem);
  };
}