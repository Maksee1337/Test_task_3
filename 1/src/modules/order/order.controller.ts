import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { idDto } from '../bookingObject/dto/id.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './order.entity';

@Controller('order')
@ApiTags(`Order`)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 201, description: 'Creates order' })
  addOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.addOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Returns all orders', type: OrderEntity, isArray: true })
  findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one order' })
  @ApiResponse({ status: 200, description: 'Returns one order', type: OrderEntity, isArray: false })
  findOne(@Param() { id }: idDto): Promise<OrderEntity> {
    return this.orderService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponse({ status: 200, description: 'Deletes order' })
  delete(@Param() { id }: idDto) {
    return this.orderService.delete(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ status: 200, description: 'Updates order' })
  update(@Param() { id }: idDto, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update({ ...updateOrderDto, id });
  }
}
