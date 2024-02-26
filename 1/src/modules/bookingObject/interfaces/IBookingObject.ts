import { bookingObjectType } from '../../../core/config/configuration';

export interface IBookingObject {
  id: number;
  name: string;
  description: string;
  type: bookingObjectType;
  price: number;
  totalQuantity: number;
}
