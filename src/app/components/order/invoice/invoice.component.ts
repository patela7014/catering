import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js';

import {Observable} from 'rxjs/Rx';
import CreateOrderModel from '../../../models/create-order.model';
import {Store} from '@ngrx/store';
import { CurrencyPipe } from '@angular/common';
import * as OrderActions from '../../../store/order/order.action';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  today = Date.now();
  orderCartState$: Observable<any>;
  orderTimings: any;
  orderTimingsData : any;
  customersState$ : Observable<any>;
  constructor(private store: Store<any>) { }
  itemsList: any;
  totalCost: number;
  selectedCustomer : any;
  ngOnInit() {
    this.orderCartState$ = this.store.select(state => {
      console.log('state', state)
      return state;
    });
    const classObj = this;
    this.orderCartState$.subscribe((data) => {
      this.orderTimings = data.orders.orderCart.orderTimings;

      const items = data.orders.orderCart.orderTimings[0].items;
      let itemsData = data.items.items.map((itemCategory)=>{
        return itemCategory.items;
      });
      itemsData = itemsData.reduce(function(prev, curr) {
        return prev.concat(curr);
      });

      this.orderTimingsData = this.orderTimings.map(ot=>{

        const itemData = ot.items.map((it) => {
          let data = itemsData.find(item => item.id === it.itemId)
          return {
            ...data,
            price: it.price
          };
        });
        return{
          ...ot,
          itemData
        };
      })

      console.log('orderTimings', this.orderTimingsData)

      classObj.totalCost = items.reduce(function(prev, curr) {
        return prev + curr.price;
      }, 0);

      if(data.customers !== undefined){
        this.selectedCustomer = data.customers.customers.find(c => c.id === parseInt(data.orders.orderCart.customerId))
      }

    });


    this.customersState$ = this.store.select('customers');
    this.customersState$.subscribe((data) => {
    });

    console.log('jgjkhg', document.getElementById('results').innerHTML)
  }

  download(){
    let element = document.getElementById('results');
    let opt = {
      margin:       0.2,
      filename:     'catering-order.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    html2pdf(element, opt);
  }

}
