import { IOrderAttributes } from '../order.interface';
import { IsDate, IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderDto implements IOrderAttributes {
  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  bookingObjectId: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  note: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  startDate: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  endDate: Date;

  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsEmpty()
  id: number;
}
