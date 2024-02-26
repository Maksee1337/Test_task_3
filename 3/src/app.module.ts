import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingObjectModule } from './modules/bookingObject/bookingObject.module';
import { OrderModule } from './modules/order/order.module';
import configuration from './core/config/configuration';
import sequelize from './core/config/sequelize';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    SequelizeModule.forRoot(sequelize()),
    BookingObjectModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
