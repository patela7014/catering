import {Component, Input, OnInit} from '@angular/core';
import CreateOrderModel from '../../../models/create-order.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orderCartState$: Observable<any>;
  orderCartData : CreateOrderModel;
  constructor(private orderStore: Store<any>) { }
  itemsList: any;
  totalCost: number;
  @Input() index = 0;
  @Input() items: any = [];
  ngOnInit() {
    this.orderCartState$ = this.orderStore.select(state => {
      // this.orderCartData = state.orders.orderCart.orderTimings[this.index];
      return state;
    });
    const classObj = this;
    this.orderCartState$.subscribe((data) => {
      const items = data.orders.orderCart.orderTimings[this.index].items;

      let itemsData = data.items.items.map((itemCategory)=>{
        return itemCategory.items;
      });
      itemsData = itemsData.reduce(function(prev, curr) {
        return prev.concat(curr);
      });
      classObj.itemsList = items.map((it) => {
        let data = itemsData.find(item => item.id === it.itemId)
        return {
          ...data,
          price: it.price
        };
      });

      classObj.totalCost = items.reduce(function(prev, curr) {
        return prev + curr.price;
      }, 0);
    });
  }

  createOrder() {
  }

}
