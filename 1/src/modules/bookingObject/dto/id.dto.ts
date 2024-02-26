import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class idDto {
  @IsNumberString()
  @ApiProperty()
  id: number;
}
