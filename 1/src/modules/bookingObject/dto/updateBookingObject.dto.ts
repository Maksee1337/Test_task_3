import { IBookingObject } from '../interfaces/IBookingObject';
import { bookingObjectType } from '../../../core/config/configuration';
import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingObjectDto implements IBookingObject {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price: number;

  @IsEmpty()
  totalQuantity: number;

  @IsEnum(bookingObjectType)
  @IsOptional()
  type: bookingObjectType;

  @IsEmpty()
  id: number;
}
