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

@Injectable()
export class OrderEffects {

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
}
