import { handlerHttpError } from "@/helpers/toast";
import { httpInstance } from "@/lib/axios/httpInstance";
import { FilterRequestDTO, PaginationRequestDTO } from "@/shared/types/dtos";

export async function getProductsList(paginationDTO?: PaginationRequestDTO, filterRequestDTO?: FilterRequestDTO, sort?: string) {
  try {
    const { data } = await httpInstance.get("/product/filter/page", {
      params: { ...paginationDTO, ...filterRequestDTO, sort },
    });

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}
