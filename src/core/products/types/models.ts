import { Supplier } from '@/core/suppliers/types/models';

export interface ProductSupplier {
  id: number;
  supplier: Supplier;
}

export interface Product {
  id: number;
  description: string;
  unit: string;
  unitaryValue: number;
  productSuppliers: ProductSupplier[];
  active: boolean;
}
