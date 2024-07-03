import { handlerHttpError } from '@/helpers/toast';
import { httpInstance } from '@/lib/axios/httpInstance';
import { DefaultRequestParams } from '@/shared/types/props';

export async function getOrdersList({ paginationDTO, filterRequestDTO, sort }: DefaultRequestParams) {
  try {
    const { data } = await httpInstance.get('/order/filter/page', {
      params: { ...paginationDTO, ...filterRequestDTO, sort },
    });

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}
