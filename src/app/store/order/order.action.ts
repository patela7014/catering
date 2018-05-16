import { OrderState } from './order.state';
import CreateOrderModel from '../../models/create-order.model';

import {Action} from '@ngrx/store';

export const UPDATE_ORDER_CART = '[CreateOrderModel] UPDATE_ORDER_CART';

// Actions for Order
export class UpdateOrderCart implements Action {
    readonly type = UPDATE_ORDER_CART;
    constructor(public payload: CreateOrderModel) {}
}
export type OrderActions = UpdateOrderCart;
