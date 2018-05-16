import { CustomerState } from './customer.state';
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

import * as CustomerActions from './customer.action';

import { HttpClient } from '@angular/common/http';
@Injectable()
export class CustomerEffects {

  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) { }


  @Effect()
  GetCustomers$: Observable<Action> = this.actions$.
    ofType<CustomerActions.GetCustomers>(CustomerActions.GET_CUSTOMERS)
    .mergeMap(action =>
    {
      return this.http.get(environment.client.base_url + '/api/customers')
        .map((data: any) => {
          return new CustomerActions.GetCustomersSuccess(data.result);
        })
        .catch(() => of(new CustomerActions.GetCustomersError()))
    }
    );

  @Effect()
  CreateCustomer$: Observable<Action> = this.actions$.
  ofType<CustomerActions.CreateCustomer>(CustomerActions.CREATE_CUSTOMER)
    .mergeMap(action =>
      {
        console.log('called');
        return this.http.post(environment.client.base_url + '/api/customers', action.payload)
          .map((data: any) => {
            return new CustomerActions.CreateCustomerSuccess(data.result);
          })
          .catch(() => of(new CustomerActions.CreateCustomerError()))
      }
    );
}
