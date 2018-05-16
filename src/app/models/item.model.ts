
export default class ItemModel {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  isActive: boolean;

  constructor() {
    this.id = '';
    this.description = '';
    this.name = '';
    this.category = '';
    this.image = '';
    this.price = 0;
    this.isActive = true;
  }

  static initializeEmptyItem(): ItemModel {
    return {
      id: 'new',
      name: '',
      description: '',
      category: '',
      image: '',
      price: 0,
      isActive: true
    }
  }

}


