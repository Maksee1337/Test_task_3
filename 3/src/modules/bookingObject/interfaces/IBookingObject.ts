import { bookingObjectType } from '../../../core/config/configuration';
import * as module from 'module';

export interface IBookingObject {
  id: number;
  name: string;
  description: string;
  type: bookingObjectType;
  price: number;
  totalQuantity: number;
}
