import { Component, OnInit } from '@angular/core';
import * as ItemActions from '../../../store/item/item.action';
import {Store} from '@ngrx/store';
import {ItemState} from '../../../store/item/item.state';
import CreateOrderModel from '../../../models/create-order.model';
import {Observable} from '../../../../../node_modules/rxjs';
import CustomerModel from '../../../models/customer.model';
import * as CustomerActions from '../../../store/customer/customer.action';
import {initializeCustomerState} from '../../../store/customer/customer.state';

@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.scss']
})
export class CompleteOrderComponent implements OnInit {
  customer: CustomerModel = {...initializeCustomerState()};
  constructor(private store: Store<any>, private orderStore: Store<any>) { }

  ngOnInit() {
  }

  createCustomer(){
    this.store.dispatch(new CustomerActions.CreateCustomer(this.customer));
    console.log('this', this.customer)
  }
}
