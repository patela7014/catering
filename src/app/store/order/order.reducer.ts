import CreateOrderModel from '../../models/create-order.model';
import { initializeOrderState, OrderState, OrderListState } from './order.state';
import * as OrderActions from './order.action';

export type Action = OrderActions.OrderActions;

const defaultOrderState = {
  ...initializeOrderState()
};
const defaultOrderStates: OrderState[] = [
  defaultOrderState
]

const defaultState: OrderListState = {
    orders: defaultOrderStates,
    orderCart: defaultOrderState,
    loading: false,
    pending: 0
}

export function OrderReducer(state = defaultState, action: Action) {
  switch (action.type) {
        case OrderActions.UPDATE_ORDER_CART: {
            const newState = {
              ...state,
              orderCart: action.payload,
              loading: false
            };
            return newState;
        }
        case OrderActions.DOWNLOAD_ORDER_REPORT:
        case OrderActions.DOWNLOAD_ORDER_REPORT_SUCCESS:
          {
          return state;
        }
        default: {
            return state;
        }
    }
}
