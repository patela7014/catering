import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {Observable} from 'rxjs/Rx';
import CreateOrderModel from '../../../models/create-order.model';
import {Store} from '@ngrx/store';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  orderCartState$: Observable<any>;
  orderTimings: any;
  orderTimingsData : any;
  constructor(private orderStore: Store<CreateOrderModel>) { }
  itemsList: any;
  totalCost: number;
  ngOnInit() {
    this.orderCartState$ = this.orderStore.select(state => {
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
    });
  }

  download(){
    html2canvas(document.getElementById('results')).then(function(canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, 'JPEG', 15, 40, 180, 160);
      doc.save('testCanvas.pdf');
    });
  }

}
