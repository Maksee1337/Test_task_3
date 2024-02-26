import { Module } from '@nestjs/common';
import { BookingObjectController } from './bookingObject.controller';
import { BookingObjectService } from './bookingObject.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingObjectEntity } from './bookingObject.entity';

@Module({
  imports: [SequelizeModule.forFeature([BookingObjectEntity])],
  controllers: [BookingObjectController],
  providers: [BookingObjectService],
})
export class BookingObjectModule {}
