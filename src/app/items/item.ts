enum StockUrgency {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface Item {
  id?: number;
  name?: string;
  price?: number;
  imageUrl?: string;
  stockUrgency?: StockUrgency;
  description?: string;
  amountOfStock?: number;
}
