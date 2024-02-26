import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderEntity } from './order.entity';
import { BookingObjectEntity } from '../bookingObject/bookingObject.entity';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { Op } from 'sequelize';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderEntity)
    private orderEntity: typeof OrderEntity,
    @InjectModel(BookingObjectEntity)
    private bookingObjectRepository: typeof BookingObjectEntity,
  ) {}
  private async findCrossingOrders(createOrderDto: CreateOrderDto) {
    const data = await this.bookingObjectRepository.findOne({
      where: {
        id: createOrderDto.bookingObjectId,
      },
      include: {
        model: OrderEntity,
        required: false,
        where: {
          id: { [Op.ne]: createOrderDto.id || null },
          [Op.or]: [
            {
              [Op.and]: {
                startDate: { [Op.lte]: createOrderDto.startDate },
                endDate: { [Op.gte]: createOrderDto.startDate },
              },
            },
            {
              [Op.and]: {
                startDate: { [Op.lte]: createOrderDto.endDate },
                endDate: { [Op.gte]: createOrderDto.endDate },
              },
            },
            {
              [Op.and]: {
                startDate: { [Op.gte]: createOrderDto.startDate },
                endDate: { [Op.lte]: createOrderDto.endDate },
              },
            },
          ],
        },
      },
    });

    return {
      totalQuantity: data.totalQuantity,
      orders: data.orders.map((el) => ({
        startDate: new Date(el.startDate),
        endDate: new Date(el.endDate),
        quantity: el.quantity,
      })),
    };
  }

  private async checkOrder(createOrderDto: CreateOrderDto) {
    const data = await this.findCrossingOrders(createOrderDto);
    const startDate = new Date(createOrderDto.startDate);
    const endDate = new Date(createOrderDto.endDate);
    if (startDate > endDate) {
      throw new ConflictException(`Start date can not be greater than end date.`);
    }
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const sum = data.orders.reduce((sum, order) => {
        return d >= order.startDate && d <= order.endDate ? sum + order.quantity : sum;
      }, 0);
      if (sum + createOrderDto.quantity > data.totalQuantity) {
        return false;
      }
    }
    return true;
  }

  async addOrder(createOrderDto: CreateOrderDto) {
    if (await this.checkOrder(createOrderDto)) {
      await this.orderEntity.create({ ...createOrderDto });
    } else {
      throw new ConflictException(`Can not create an order.`);
    }
  }

  async findAll() {
    return this.orderEntity.findAll();
  }

  async findOne(id: number) {
    const order = await this.orderEntity.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async delete(id: number) {
    const deleteResult = await this.orderEntity.destroy({
      where: { id },
    });
    if (!deleteResult) {
      throw new NotFoundException('Booking object not found');
    }
  }

  async update(updateOrderDto: UpdateOrderDto) {
    const order = await this.orderEntity.findOne({ where: { id: updateOrderDto.id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const updatedOrder = { ...order.toJSON(), ...updateOrderDto };
    if (
      (updateOrderDto.quantity || updateOrderDto.startDate || updateOrderDto.endDate) &&
      !(await this.checkOrder(updatedOrder))
    ) {
      throw new ConflictException(`Can not update an order.`);
    }
    await order.update(updatedOrder);
  }
}
