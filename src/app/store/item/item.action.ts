import { ItemState } from './item.state';
import ItemModel from '../../models/item.model';

import {Action} from '@ngrx/store';

export const GET_ITEMS = '[ItemModel] GET_ITEMS';
export const GET_ITEMS_SUCCESS = '[ItemModel] GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = '[ItemModel] GET_ITEMS_ERROR';

// Actions for Getting Items
export class GetItems implements Action {
    readonly type = GET_ITEMS;
}

export class GetItemsSuccess implements Action {
    readonly type = GET_ITEMS_SUCCESS;
    constructor(public payload: ItemState[]) {}
}

export class GetItemsError implements Action {
    readonly type = GET_ITEMS_ERROR;
}

export type All = GetItems | GetItemsSuccess | GetItemsError;
