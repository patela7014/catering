export default class OrderTimingsModel {
  tabTitle : string;
  numberOfPeople: number;
  numberOfPlates: number;
  amount: number;
  description: string;
  deliveryCharge: number;
  deliveryAddress: string;
  deliveryDate: any;
  items: any;
}

export const initializeOrderTimingsState  = function(title) {
  return {
    tabTitle : title === undefined ? 'Day 1' : title,
    numberOfPeople: 0,
    numberOfPlates: 0,
    amount: 0,
    description: '',
    deliveryCharge: 0,
    deliveryAddress: '',
    deliveryDate : '',
    items: []
};
}

