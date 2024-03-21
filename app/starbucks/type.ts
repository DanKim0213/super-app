export type Item = {
  id: string;
  src: string;
  name: string;
  price: number;
};

export type OrderItem = Item & { count: number };
