export interface IOrderAttributes {
  id: number;
  bookingObjectId: number;
  name: string;
  note: string;
  quantity: number;
  startDate: Date;
  endDate: Date;
}
