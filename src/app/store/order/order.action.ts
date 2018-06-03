import { OrderState } from './order.state';
import CreateOrderModel from '../../models/create-order.model';

import {Action} from '@ngrx/store';

export const UPDATE_ORDER_CART = '[CreateOrderModel] UPDATE_ORDER_CART';
export const DOWNLOAD_ORDER_REPORT = '[CreateOrderModel] DOWNLOAD_ORDER_REPORT';
export const DOWNLOAD_ORDER_REPORT_SUCCESS = '[CreateOrderModel] DOWNLOAD_ORDER_REPORT_SUCCESS';

// Actions for Order
export class UpdateOrderCart implements Action {
    readonly type = UPDATE_ORDER_CART;
    constructor(public payload: CreateOrderModel) {}
}

export class DownloadOrderReport implements Action {
  readonly type = DOWNLOAD_ORDER_REPORT;
  constructor(public payload: any) {}
}

export class DownloadOrderReportSuccess implements Action {
  readonly type = DOWNLOAD_ORDER_REPORT_SUCCESS;
  constructor() {}
}
export type OrderActions = UpdateOrderCart | DownloadOrderReport | DownloadOrderReportSuccess;
