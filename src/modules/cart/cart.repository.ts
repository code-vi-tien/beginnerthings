import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CartItemDTO } from "./dto/cart-item.dto";
import { Cart, CartItem } from "@prisma/client";
import { ICartRepo } from "./interface/cart.repository.interface";


@Injectable()
export class CartRepo implements ICartRepo {
    constructor(private prisma: PrismaService) {}

    async upsertCart(userId: string, dto: CartItemDTO): Promise<CartItem> {
        const { productId, quantity, variant } = dto
        
        if (quantity < 0) {
        throw new BadRequestException('Quantity cannot be a negative number.');
        }
        /*Find product*/
        const product = await this.prisma.product.findUnique({
            where: {id: productId},
            select: {price: true}
        })
        if (!product) {
            throw new NotFoundException(`Product with ID: ${productId} not found.`)
        }
        const priceSnapshot = product.price;    
        
        /*Find cart*/
        let cart = await this.prisma.cart.findFirst({
            where: { userId: userId },
            select: { id: true }
        })
        if (!cart) {
        cart = await this.prisma.cart.create({
            data: {
                userId: userId,
                status: 'ACTIVE'
                }
            });
        }
        const cartId = cart.id

        /* Check for item exist or not */
        const existingItem = await this.prisma.cartItem.findFirst({
            where: { cartId: cartId,
                productId: productId,
                variant: variant || ''
            }
        })
        if (existingItem) {
            return this.prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity }
            })
        }

        if (quantity === 0) {
            try {
                const existingItem = await this.prisma.cartItem.findFirst({
                where: { cartId, productId, variant: variant || '' }
                });
                if (existingItem) {
                    return this.prisma.cartItem.delete({
                        where: { id: existingItem.id }
                    })
                }
                return null
            } catch (error) {
                console.log(`Error getting the item: ${error}`)
                return null
            }
        }

        return await this.prisma.cartItem.create({
            data: { 
                product: {
                    connect: {
                        id: productId,
                    },
                },
                cart: {
                    connect: {
                        id: cartId,
                    },
                },
                priceSnapshot: priceSnapshot,
                quantity,
                variant: variant || ''
            }
        });
    };

    async getCart(userId: string): Promise<Cart> {
        return this.prisma.cart.findFirst({
            where: { userId },
            include: {
                cartItems: {
                    include: {
                        product: true
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
