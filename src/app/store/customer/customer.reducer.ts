import CustomerModel from '../../models/item.model';
import { initializeCustomerState, CustomerState, CustomerListState } from './customer.state';
import * as CustomerActions from './customer.action';

export type Action = CustomerActions.CustomerActions;

const defaultCustomerStates: CustomerState[] = [
  {
    loading: false,
    error: false,
    ...initializeCustomerState()
  }
]

const defaultState: CustomerListState = {
    customers: defaultCustomerStates,
    loading: false,
    pending: 0
}

export function CustomerReducer(state = defaultState, action: Action) {
    switch (action.type) {
        case CustomerActions.CREATE_CUSTOMER: {
          return { ...state, loaded: false, loading: true };
        }
        case CustomerActions.CREATE_CUSTOMER_SUCCESS: {
          return {
            ...state,
            loaded: true,
            loading: false,
            customers: [...state.customers, action.payload]
          };
        }
        case CustomerActions.GET_CUSTOMERS: {
            return { ...state, loaded: false, loading: true };
        }
        case CustomerActions.GET_CUSTOMERS_SUCCESS: {
            return {
                ...state,
                customers: [
                    ...action.payload
                ],
                loading: false
            };
        }
        default: {
            return state;
        }
    }
}
