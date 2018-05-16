import { CustomerState , CustomerListState} from './customer.state';
import CustomerModel from '../../models/customer.model';

import {Action} from '@ngrx/store';

export const GET_CUSTOMERS = '[CustomerModel] GET_CUSTOMERS';
export const GET_CUSTOMERS_SUCCESS = '[CustomerModel] GET_CUSTOMERS_SUCCESS';
export const GET_CUSTOMERS_ERROR = '[CustomerModel] GET_CUSTOMERS_ERROR';

export const CREATE_CUSTOMER = '[CustomerModel] CREATE_CUSTOMER';
export const CREATE_CUSTOMER_SUCCESS = '[CustomerModel] CREATE_CUSTOMER_SUCCESS';
export const CREATE_CUSTOMER_ERROR = '[CustomerModel] CREATE_CUSTOMER_ERROR';

// Actions for Getting Items
export class GetCustomers implements Action {
    readonly type = GET_CUSTOMERS;
}

export class GetCustomersSuccess implements Action {
    readonly type = GET_CUSTOMERS_SUCCESS;
    constructor(public payload: CustomerState[]) {}
}

export class GetCustomersError implements Action {
    readonly type = GET_CUSTOMERS_ERROR;
}

export class CreateCustomer implements Action {
  readonly type = CREATE_CUSTOMER;
  constructor(public payload: CustomerModel){}
}

export class CreateCustomerSuccess implements Action {
  readonly type = CREATE_CUSTOMER_SUCCESS;
  constructor(public payload: CustomerState[]) {}
}

export class CreateCustomerError implements Action {
  readonly type = CREATE_CUSTOMER_ERROR;
}

export type CustomerActions = GetCustomers | GetCustomersSuccess | GetCustomersError
  | CreateCustomer
  | CreateCustomerSuccess
  | CreateCustomerError;
