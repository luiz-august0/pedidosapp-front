import { Supplier } from '@/core/suppliers/types/models';

export interface Product {
  id?: number;
  description: string;
  unit: string;
  unitaryValue: number;
  suppliers?: Omit<Supplier, "products">[];
  active?: boolean;
}
