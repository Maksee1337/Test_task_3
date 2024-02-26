import { Column, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IOrderAttributes } from './order.interface';
import { BookingObjectEntity } from '../bookingObject/bookingObject.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'order', timestamps: false })
export class OrderEntity extends Model<OrderEntity> implements IOrderAttributes {
  @Column({ primaryKey: true, autoIncrement: true })
  @ApiProperty()
  id: number;

  @Column({ type: DataTypes.TEXT, allowNull: false })
  @ApiProperty()
  name: string;

  @Column({ type: DataTypes.TEXT, allowNull: true })
  @ApiProperty()
  note: string;

  @Column({ type: DataTypes.INTEGER, allowNull: false })
  @ApiProperty()
  quantity: number;

  @Column({ type: DataTypes.DATEONLY, allowNull: false })
  @ApiProperty()
  startDate: Date;

  @Column({ type: DataTypes.DATEONLY, allowNull: false })
  @ApiProperty()
  endDate: Date;

  @ForeignKey(() => BookingObjectEntity)
  @Column
  @ApiProperty()
  bookingObjectId: number;

  @BelongsTo(() => BookingObjectEntity, { onDelete: 'CASCADE' })
  bookingObject: BookingObjectEntity;
}
