import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingObjectDto } from './dto/createBookingObject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookingObjectEntity } from './bookingObject.entity';
import { UpdateBookingObjectDto } from './dto/updateBookingObject.dto';

@Injectable()
export class BookingObjectService {
  constructor(
    @InjectModel(BookingObjectEntity)
    private bookingObjectRepository: typeof BookingObjectEntity,
  ) {}
  async addBookingObject(createBookingObjectDto: CreateBookingObjectDto) {
    await this.bookingObjectRepository.create({
      ...createBookingObjectDto,
    });
  }

  async findAll() {
    return this.bookingObjectRepository.findAll();
  }

  async findOne(id: number) {
    const bookingObject = await this.bookingObjectRepository.findOne({
      where: { id },
    });
    if (!bookingObject) {
      throw new NotFoundException('Booking object not found');
    }
    return bookingObject;
  }

  async update(updateBookingObjectDto: UpdateBookingObjectDto) {
    const bookingObject = await this.bookingObjectRepository.findOne({
      where: { id: updateBookingObjectDto.id },
    });
    if (!bookingObject) {
      throw new NotFoundException('Booking object not found');
    }
    await bookingObject.update({ ...bookingObject.toJSON(), ...updateBookingObjectDto });
  }

  async delete(id: number) {
    const deleteResult = await this.bookingObjectRepository.destroy({
      where: { id },
    });
    if (!deleteResult) {
      throw new NotFoundException('Booking object not found');
    }
  }
}
