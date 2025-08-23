import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { ItemDTO } from "../../application/dto/item/item.dto";
import { CartItem, Prisma } from "@prisma/client";
import { ICartRepo } from "../../domain/interfaces/repositories/cart.repository.interface";
import { CartDetailsEntity } from "src/domain/entities/cart-details.entity";

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

    async upsertCart(cartId: string, dto: ItemDTO): Promise<CartItem> {
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