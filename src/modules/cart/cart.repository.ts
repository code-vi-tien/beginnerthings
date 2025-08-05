import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CartItemDTO } from "./dto/cart-item.dto";
import { Cart, CartItem } from "@prisma/client";
import { ICartRepo } from "./interface/cart.repository.interface";


@Injectable()
export class CartRepo implements ICartRepo {
    constructor(private prisma: PrismaService) {};

    async createCart(userId) {
        return await this.prisma.cart.create({
            data: {
                userId: userId,
                status: 'ACTIVE'
            }
        });
    };

    async findCartByUserId(userId) {
        return await this.prisma.cart.findFirst({
            where: userId
        });
    };

    async upsertCart(cartId: string, dto: CartItemDTO): Promise<CartItem> {
        const { productVariantId, quantity, price } = dto;

        return await this.prisma.cartItem.upsert({
            where: { 
                cartId_productVariantId: { 
                    cartId: cartId,
                    productVariantId: productVariantId,
                },
            },
            create: {
                cartId: cartId,
                productVariantId: productVariantId,
                quantity: quantity,
                priceSnapshot: price,
            },
            update: {
                quantity: {
                    increment: quantity,
                },
                priceSnapshot: price,
            },
        });
    };

    async getCart(userId: string): Promise<Cart> {
        return this.prisma.cart.findFirst({
            where: { userId },
            include: {
                cartItems: {
                    include: {
                        productVariant: true
                    }
                }
            }
        })
    };

    async removeCartItem(userId: string, cartItemId: string): Promise<CartItem> {
        const cartItem = await this.prisma.cartItem.findFirst({
            where: { 
                id: cartItemId,
                cart: {
                    userId: userId
                },
             }
        });
        if (!cartItem) {
            throw new NotFoundException(`Item with ID: ${cartItemId}is not found.`)
        }

        return await this.prisma.cartItem.delete({
            where: { id: cartItem.id }
        })
    };
}
