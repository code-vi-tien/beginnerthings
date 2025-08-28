import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CartItemDTO, CartItemResponseDTO } from 'src/application/dto/cart/cart-item.dto';

import { CartResponseDTO } from '../dto/cart/cart.response.dto';

import { ICartRepo } from 'src/domain/interfaces/repositories/cart.repository.interface';
import { ICartService } from 'src/domain/interfaces/services/cart.service.interface';
import { IProductService } from 'src/domain/interfaces/services/product.service.interface';
import { ProductDTO } from '../dto/product/product.dto';
import { CartItemEntity } from 'src/domain/entities/cart-item.entity';

@Injectable()
export class CartService implements ICartService{
  constructor(
    private readonly cartRepo: ICartRepo,
    private readonly productService: IProductService
  ) {}
  
  async addItem(userId: string, dto: CartItemDTO): Promise<CartItemResponseDTO> {
    try {
      // Changing the dto
      const productVariantDTO = new ProductDTO();
      productVariantDTO.productVariantId = dto.productVariantId;
      // Get the product with its variant
      const productVariant = await this.productService.findProductVariant(productVariantDTO);
      if (!productVariant) {
        throw new BadRequestException("Item doesn't exist");
      }

      /* Validate cart and cart items */
      let cart = await this.cartRepo.findCartByUserId(userId);
      if (!cart) {
        cart = await this.cartRepo.createCart(userId);
      }

      const item = new CartItemEntity(
        dto.productVariantId,
        dto.quantity,
        dto.priceSnapshotId,
      )
      const cartItem = await this.cartRepo.upsertCart(cart.id, item);

      return new CartItemResponseDTO(cartItem); 

    } catch (error) {
      console.error(`Error adding item to cart for user ${userId}:`, error);

      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; // Re-throw the specific error
      }
        throw new BadRequestException('An unexpected error occurred during cart update.');
      }
  };

  async getCart(userId: string, cartId: string): Promise<CartResponseDTO> {
    try {
      let cart = await this.cartRepo.findCart(cartId);
      if (!cart || cart.userId !== userId) {
        throw new NotFoundException('Cart not found for user');
      }

      if (cart.cartItem.length === 0) {
        throw new NotFoundException('There is no item in the cart')
      }

      cart = await this.cartRepo.getCartDetails(cartId);

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