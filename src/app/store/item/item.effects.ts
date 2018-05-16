import { ItemState } from './item.state';
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

import * as ItemActions from './item.action';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class ItemEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) { }


  @Effect()
  GetItems$: Observable<Action> = this.actions$.
    ofType<ItemActions.GetItems>(ItemActions.GET_ITEMS)
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
