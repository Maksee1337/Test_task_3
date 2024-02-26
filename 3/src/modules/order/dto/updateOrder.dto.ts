import { IOrderAttributes } from '../order.interface';
import { IsDate, IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateOrderDto implements IOrderAttributes {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsEmpty()
  bookingObjectId: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  note: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @ApiProperty()
  startDate: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @ApiProperty()
  endDate: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  quantity: number;

  @IsEmpty()
  id: number;
}
