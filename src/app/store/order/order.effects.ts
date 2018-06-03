import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { HttpClient } from '@angular/common/http';
import * as ItemActions from '../item/item.action';
import * as OrderActions from './order.action';
import * as CustomerActions from '../customer/customer.action';

@Injectable()
export class OrderEffects {

  static saveByteArray(reportName, byte) {
    const blob = new Blob([byte]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = reportName + ".pdf";
    link.download = fileName;
    link.click();
  }
  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) { }

  @Effect()
  createOrderCart$: Observable<Action> = this.actions$.
  ofType<OrderActions.UpdateOrderCart>(OrderActions.UPDATE_ORDER_CART)
    .mergeMap(action =>
      {
        return this.http.get(environment.client.base_url + '/api/categories')
          .map((data: any) => {
            return new ItemActions.GetItemsSuccess(data.result);
          })
          .catch(() => of(new ItemActions.GetItemsError()))
      }
    );

  @Effect()
  downloadOrderReport$: Observable<Action> = this.actions$.
  ofType<OrderActions.DownloadOrderReport>(OrderActions.DOWNLOAD_ORDER_REPORT)
    .mergeMap(action =>
      {
        return this.http.post(environment.client.base_url + '/api/orders/report', action.payload)
          .map((data: any) => {
            OrderEffects.saveByteArray("HELLO", data)
            return new OrderActions.DownloadOrderReportSuccess();
          })
          .catch(() => of(new ItemActions.GetItemsError()))
      }
    );

    base64ToArrayBuffer(base64) {
      const binaryString = window.atob(base64);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);
      for (let i = 0; i < binaryLen; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes;
    }


}
