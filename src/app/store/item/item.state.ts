import ItemModel from '../../models/item.model';

export interface ItemState extends ItemModel{
    loading: boolean;
    error: boolean;
}

export  const initializeItemState  = function() {
    return {
        loading: false,
        error: false,
    };
}

export interface ItemListState{
    items: ItemState[];
    loading: boolean;
    pending: number;
}

export const  intializeItemListState = function(){
    return {
        loading: false,
        pending: 0,
    };
}
