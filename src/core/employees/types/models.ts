import { User } from "@/core/users/types/models";

export interface Employee {
  id?: number;
  name: string;
  email?: string;
  cpf?: string;
  contact?: string;
  user: User;
  active?: boolean;
}
