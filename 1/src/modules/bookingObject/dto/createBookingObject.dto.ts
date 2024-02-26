import { IBookingObject } from '../interfaces/IBookingObject';
import { bookingObjectType } from '../../../core/config/configuration';
import { IsEmpty, IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingObjectDto implements IBookingObject {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @Min(1)
  @ApiProperty()
  totalQuantity: number;

  @IsEnum(bookingObjectType)
  @ApiProperty({ enum: bookingObjectType })
  type: bookingObjectType;

  @IsEmpty()
  id: number;
}
