import { Controller, Get, Delete, Req, Body, Param, Put } from "@nestjs/common";
import { CartItemDTO } from "./dto/cart-item.dto";
import { CartService } from "./cart.service";


@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @Put('/items')
    async addItem(@Body() dto: CartItemDTO, @Req() req) {
        const userId = req.user.id;
        return await this.cartService.addItemToCart(userId, dto);
    }
    
    @Get()
    async getCart(@Req() req) {
        const userId = req.user.id;
        return await this.cartService.getCart(userId)
    }

    @Delete('/:id')
    async removeItem(@Param('id') cartItemId: string, @Req() req) {
        const userId = req.user.id
        return await this.cartService.removeItem(userId, cartItemId)
    }
}