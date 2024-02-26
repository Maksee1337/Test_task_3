import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderEntity } from './order.entity';
import { BookingObjectEntity } from '../bookingObject/bookingObject.entity';

@Module({
  imports: [SequelizeModule.forFeature([OrderEntity, BookingObjectEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
