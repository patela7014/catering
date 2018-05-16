import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {ItemListState, ItemState} from '../../../store/item/item.state';
import {Observable} from 'rxjs/Rx';
import {TodoState} from '../../../store/todo/todo.state';
import * as ItemActions from '../../../store/item/item.action';
import * as OrderActions from '../../../store/order/order.action';
import CreateOrderModel from '../../../models/create-order.model';
import {initializeOrderTimingsState} from '../../../models/order-timings.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as CustomerActions from '../../../store/customer/customer.action';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  public selectedMoment = new Date();
  form: FormGroup;
  itemsArray: any = [];
  orderCart: CreateOrderModel;
  customersState$: Observable<any>;
  orderCartState$: Observable<any>;
  itemListState$: Observable<ItemState[]>;
  orderCartData : CreateOrderModel;
  customersData : any;
  itemIndexArr: any = [];
  constructor(fb: FormBuilder, private store: Store<any>, private orderStore: Store<any>) {
    // this.form = fb.group({
    //   start: [moment('2015-11-18T00:00Z'), Validators.required],
    //   end: [moment('2015-11-24T00:00Z'), Validators.required],
    //   test: ''
    // });
  }

  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  }
  ngOnInit() {
    this.itemListState$ = this.store.select(state => {
      return state.items
    });
    this.store.dispatch(new CustomerActions.GetCustomers());
    this.store.dispatch(new ItemActions.GetItems());
    this.customersState$ = this.store.select('customers');
    this.orderCartState$ = this.store.select('orders').map((o) => {
      this.orderCartData = o.orderCart;
      return o.orderCart;
    });
    // this.orderCartState$.subscribe((data) => console.log('orderCartState$', data)
    // );
    // this.itemListState$.subscribe((data) => console.log('check', data));
  }

  setDate(index){
    // this.orderCartData.orderTimings[index].deliveryDate = this.selectedMoment;
    // this.updateCartData(index);
  }

  updateCart(index, item, e) {
    let state = this.orderCartData.orderTimings;
    console.log('state', state)
    this.itemsArray = this.orderCartData.orderTimings[index].items;
    if(e.target.checked){
      if(this.itemsArray.findIndex(it => it.itemId === item) === -1){
        this.itemIndexArr[item] = this.itemsArray.length;
        this.itemsArray.push(
          {
            itemId : item,
            price : 2
          }
        );
      }
    }else{
      delete this.itemIndexArr[item]
      let i = this.itemsArray.findIndex(it => it.itemId === item);
      this.itemsArray.splice(i, 1);
    }
    this.orderCartData.orderTimings[index].items = this.itemsArray;
    this.updateCartData(index)
  }

  updateItemPrice(index, item, value){
    this.orderCartData.orderTimings[index].items.find(it => it.itemId === item.id).price = parseInt(value);
    console.log('this.orderCartData.orderTimings', this.orderCartData.orderTimings, value)
    this.updateCartData(index)
  }

  itemPriceVal(index, item){
    return this.orderCartData.orderTimings[index].items.find(it => it.itemId === item.id).price
  }

  updateCartData(index){
    let state = this.orderCartData.orderTimings;
    let updatedOrderTimings = [
      ...state.slice(0, index),
      this.orderCartData.orderTimings[index],
      ...state.slice(index + 1)
    ];
    this.store.dispatch(new OrderActions.UpdateOrderCart({ ...this.orderCartData, orderTimings: updatedOrderTimings}));
  }

  checkedOrder(index, item){
    return this.orderCartData.orderTimings[index].items.find(it => it.itemId === item.id)
  }

  addDay(){
    let index = this.orderCartData.orderTimings.length + 1;
    this.orderCartData.orderTimings.push(
      initializeOrderTimingsState(`Day ${index}`)
    )
  }

}
