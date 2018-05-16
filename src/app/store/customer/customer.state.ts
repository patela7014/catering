import CustomerModel from '../../models/customer.model';

export interface CustomerState extends CustomerModel{
    loading: boolean;
    error: boolean;
}

export const initializeCustomerState  = function() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isActive: true,
  };
}

export interface CustomerListState{
    customers: CustomerState[];
    loading: boolean;
    pending: number;
}

export const  intializeCustomerListState = function(){
    return {
        loading: false,
        pending: 0,
    };
}
