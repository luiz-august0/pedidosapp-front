import { Product } from '@/core/products/types/models';

export interface Supplier {
  id?: number;
  name: string;
  email?: string;
  socialReason?: string;
  cnpj?: string;
  cpf?: string;
  contact?: string;
  products?: Omit<Product, "suppliers">[];
  active?: boolean;
}
