import { Controller, Get, Delete, Req, Body, Param, Put } from "@nestjs/common";
import { ItemDTO } from "src/application/dto/item/item.dto";
import { ICartService } from "src/domain/interfaces/services/cart.service.interface";



@Controller('cart')
export class CartController {
    constructor(private cartService: ICartService) {}

    @Put('/items')
    async addItem(@Body() dto: ItemDTO, @Req() req) {
        const userId = req.user.id;
        return await this.cartService.addItem(userId, dto);
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