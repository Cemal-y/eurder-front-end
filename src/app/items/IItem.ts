enum StockUrgency {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface IItem {
  id?: string;
  name?: string;
  price?: number;
  imageUrl?: string;
  stockUrgency?: StockUrgency;
  description?: string;
  amountOfStock?: number;
}
