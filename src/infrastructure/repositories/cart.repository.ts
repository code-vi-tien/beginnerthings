import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { CartItem, Prisma } from "@prisma/client";
import { ICartRepo } from "../../domain/interfaces/repositories/cart.repository.interface";
import { CartDetailsEntity } from "src/domain/entities/cart-details.entity";
import { ProductDTO } from "src/application/dto/product/product.dto";
import { CartItemDTO } from "src/application/dto/cart/cart-item.dto";
import { CartItemEntity } from "src/domain/entities/cart-item.entity";

const cartDetails = Prisma.validator<Prisma.CartDefaultArgs>()({
    include: {
        cartItems: {
            include: {
                productVariant: {
                    include: {
                        product: true
                    }
                }
            }
        }
    }
});
export type CartDetails = Prisma.CartGetPayload<typeof cartDetails>

@Injectable()
export class CartRepo implements ICartRepo {
    constructor(private prisma: PrismaService) {};

    async createCart(userId: string) {
        return await this.prisma.cart.create({
            data: {
                userId: userId,
                status: 'ACTIVE'
            }
        });
    };

    async findCart(cartId: string) {
        return await this.prisma.cart.findFirst({
            where: {id: cartId}
        });
    };

    async findCartByUserId(userId: string) {
        return await this.prisma.cart.findFirst({
            where: {userId: userId}
        })
    };

    async upsertCart(cartId: string, item: CartItemEntity): Promise<CartItem> {

        return await this.prisma.cartItem.upsert({
            where: { 
                cartId_productVariantId: { 
                    cartId: cartId,
                    productVariantId: item.productVariantId,
                },
            },
            create: {
                cartId: cartId,
                productVariantId: item.productVariantId,
                quantity: item.quantity,
                priceSnapshotId: item.priceSnapshotId,
            },
            update: {
                quantity: {
                    increment: item.quantity,
                },
                priceSnapshotId: item.priceSnapshotId,
            },
        });
    };

    async getCartDetails(cartId: string): Promise<CartDetailsEntity | null> {
        const cart: CartDetails | null = await this.prisma.cart.findFirst({
            where: { 
                id: cartId,
                status: 'ACTIVE'
             },
            ...cartDetails
        });

        if (!cart) return null;

        return new CartDetailsEntity (
            cart.id,
            cart.userId,
            cart.cartItems,
        )

    };

    async findItem(cartItemId: string): Promise<CartItem> {
        return await this.prisma.cartItem.findFirst({
            where: {
                id: cartItemId
            }
        })
    }

    async removeCartItem(cartId: string, cartItemId: string): Promise<CartItem> {
        const cartItem = await this.prisma.cartItem.findFirst({
            where: { 
                id: cartItemId,
                cartId: cartId
             }
        });
        if (!cartItem) {
            throw new NotFoundException(`Item with ID: ${cartItemId}is not found.`)
        }

        return await this.prisma.cartItem.delete({
            where: { id: cartItem.id }
        })
    };
};