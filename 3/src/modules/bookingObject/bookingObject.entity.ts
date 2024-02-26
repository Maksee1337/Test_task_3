import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { bookingObjectType } from '../../core/config/configuration';
import { DataTypes } from 'sequelize';
import { IBookingObject } from './interfaces/IBookingObject';
import { OrderEntity } from '../order/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'bookingObject', timestamps: false })
export class BookingObjectEntity extends Model<BookingObjectEntity> implements IBookingObject {
  @Column({ primaryKey: true, autoIncrement: true })
  @ApiProperty()
  id: number;

  @Column({ type: DataTypes.TEXT, allowNull: false })
  @ApiProperty()
  name: string;

  @Column({ type: DataTypes.TEXT, allowNull: false })
  @ApiProperty()
  description: string;

  @Column({
    type: DataType.ENUM(...Object.values(bookingObjectType)),
    values: Object.values(bookingObjectType),
    allowNull: false,
  })
  @ApiProperty({ enum: bookingObjectType})
  type: bookingObjectType;

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  @ApiProperty()
  price: number;

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  @ApiProperty()
  totalQuantity: number;

  @HasMany(() => OrderEntity, { onDelete: 'CASCADE' })
  orders: OrderEntity[];
}
