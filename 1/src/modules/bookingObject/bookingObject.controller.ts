import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateBookingObjectDto } from './dto/createBookingObject.dto';
import { BookingObjectService } from './bookingObject.service';
import { idDto } from './dto/id.dto';
import { UpdateBookingObjectDto } from './dto/updateBookingObject.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingObjectEntity } from './bookingObject.entity';

@Controller('bookingObject')
@ApiTags(`Booking Object`)
export class BookingObjectController {
  constructor(private readonly bookingObjectService: BookingObjectService) {}

  @Post()
  @ApiOperation({ summary: `Add booking objects` })
  @ApiResponse({ status: 201, description: `Creates a booking objects` })
  create(@Body() createBookingObjectDto: CreateBookingObjectDto) {
    return this.bookingObjectService.addBookingObject(createBookingObjectDto);
  }

  @Get()
  @ApiOperation({ summary: `Get all booking objects` })
  @ApiResponse({ status: 200, description: `Returns all booking objects`, type: BookingObjectEntity, isArray: true })
  findAll(): Promise<BookingObjectEntity[]> {
    return this.bookingObjectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Get one booking object` })
  @ApiResponse({ status: 200, description: `Returns one booking object`, type: BookingObjectEntity, isArray: false })
  findOne(@Param() { id }: idDto): Promise<BookingObjectEntity> {
    return this.bookingObjectService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Update booking object` })
  @ApiResponse({ status: 200, description: `Updates booking object` })
  update(@Param() { id }: idDto, @Body() updateBookingObjectDto: UpdateBookingObjectDto) {
    return this.bookingObjectService.update({ ...updateBookingObjectDto, id });
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete booking object` })
  @ApiResponse({ status: 200, description: `Deletes booking object` })
  delete(@Param() { id }: idDto) {
    return this.bookingObjectService.delete(id);
  }
}
