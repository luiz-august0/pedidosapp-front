import { MultipartBean } from "@/shared/types/models";

export interface User {
  id?: number;
  login: string;
  role?: string;
  active?: boolean;
  photo?: string;
  photoMultipart?: MultipartBean;
}
