import { Customer } from '@/core/customers/types/models';
import { Product } from '@/core/products/types/models';
import { User } from '@/core/users/types/models';

export interface OrderItem {
  id?: number;
  product: Product;
  quantity: number;
  unitaryValue: number;
  amount: number;
  discount: number;
  addition: number;
}

export interface Order {
  id?: number;
  customer: Customer;
  user?: User;
  amount: number;
  discount: number;
  addition: number;
  status: string;
  inclusionDate: string;
  items: OrderItem[];
}
