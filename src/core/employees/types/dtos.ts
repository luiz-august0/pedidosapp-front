import { MultipartBean, PagedList } from "@/shared/types/models";
import { Employee } from "./models";

export type EmployeePageResponseDTO = PagedList<Employee>;

export type EmployeeRequestDTO = Pick<
  Employee,
  "name" | "email" | "cpf" | "contact" | "active"
> & {
  login: string;
  password?: string;
  photo?: string;
  photoMultipart?: MultipartBean;
};
