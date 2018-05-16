import DateTimeFormat = Intl.DateTimeFormat;
import OrderTimingsModel from './order-timings.model';

export default class CreateOrderModel {
  customerId: string;
  amount: number;
  description: string;
  isActive: boolean;
  orderTimings: OrderTimingsModel[];
}
