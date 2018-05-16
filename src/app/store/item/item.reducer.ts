import ItemModel from '../../models/item.model';
import { initializeItemState, ItemState, ItemListState } from './item.state';
import * as ItemActions from './item.action';

export type Action = ItemActions.All;

const defaultItemStates: ItemState[] = [
  {
    id: 'new',
    name: '',
    description: '',
    category: '',
    image: '',
    price: 0,
    isActive: true,
    ...initializeItemState()
  }
]

const defaultState: ItemListState = {
    items: defaultItemStates,
    loading: false,
    pending: 0
}

export function ItemReducer(state = defaultState, action: Action) {
    switch (action.type) {
        case ItemActions.GET_ITEMS: {
            return { ...state, loaded: false, loading: true };
        }
        case ItemActions.GET_ITEMS_SUCCESS: {
            return {
                ...state,
                items: [
                    ...action.payload
                ],
                loading: false
            };
        }
        default: {
            return state;
        }
    }
}
