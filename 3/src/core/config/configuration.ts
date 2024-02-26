import * as process from 'process';
export enum bookingObjectType {
  ROOM = 'room',
  APARTMENT = 'apartment',
  HOUSE = 'house',
  CAR = 'car',
  BIKE = 'bike',
  BOAT = 'boat',
  PLANE = 'plane',
}
interface IDatabaseConfig {
  host: string;
  port: number;
  password: string;
  database: string;
  username: string;
}
interface IConfig {
  port: number;
  database: IDatabaseConfig;
}
export default (): IConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
  },
});
