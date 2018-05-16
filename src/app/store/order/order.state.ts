import CreateOrderModel from '../../models/create-order.model';
import OrderTimingsModel, {initializeOrderTimingsState} from '../../models/order-timings.model';

export interface OrderState extends CreateOrderModel{
    loading: boolean;
    error: boolean;
}

export const initializeOrderState  = function() {
    return {
        customerId: '',
        amount: 0,
        description: '',
        loading: false,
        error: false,
        isActive: true,
        orderTimings: [initializeOrderTimingsState('Day 1')]
    };
}

export interface OrderListState{
    orders: OrderState[];
    orderCart: OrderState;
    loading: boolean;
    pending: number;
}

export const  intializeOrderListState = function(){
    return {
        loading: false,
        pending: 0,
    };
}
