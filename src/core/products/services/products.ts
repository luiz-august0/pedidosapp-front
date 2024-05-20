import { handlerHttpError } from '@/helpers/toast';
import { httpInstance } from '@/lib/axios/httpInstance';
import { DefaultRequestParams } from '@/shared/types/props';
import { Product } from '../types/models';

export async function getProductsList({ paginationDTO, filterRequestDTO, sort }: DefaultRequestParams) {
  try {
    const { data } = await httpInstance.get('/product/filter/page', {
      params: { ...paginationDTO, ...filterRequestDTO, sort },
    });

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function mutateProduct(product: Product) {
  try {
    const { data } = !product.id
      ? await httpInstance.post('/product', product)
      : await httpInstance.put(`/product/${product.id}`, product);

    return data;
  } catch (error) {
    handlerHttpError(error);
    throw error; 
  }
}
