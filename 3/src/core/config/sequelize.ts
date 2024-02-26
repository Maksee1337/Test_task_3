import { SequelizeModuleOptions } from '@nestjs/sequelize/dist/interfaces/sequelize-options.interface';
import configuration from './configuration';
import { BookingObjectEntity } from '../../modules/bookingObject/bookingObject.entity';
import { OrderEntity } from '../../modules/order/order.entity';
export default (): SequelizeModuleOptions => ({
  ...configuration().database,
  dialect: 'postgres',
  models: [BookingObjectEntity, OrderEntity],
  timezone: '+02:00',
  autoLoadModels: true,
  synchronize: true,
});
