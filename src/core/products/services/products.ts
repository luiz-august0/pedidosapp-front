import { handlerHttpError } from "@/core/helpers/toast";
import { PaginationRequestDTO } from "@/core/shared/types/dtos";
import { httpInstance } from "@/lib/axios/httpInstance";

export async function getProductsList(paginationDTO: PaginationRequestDTO) {
  try {
    const { data } = await httpInstance.get("/product/filter/page", {
      params: paginationDTO
    });

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}
