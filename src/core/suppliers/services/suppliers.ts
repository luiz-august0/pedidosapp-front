import { handlerHttpError } from '@/helpers/toast';
import { httpInstance } from '@/lib/axios/httpInstance';
import { DefaultRequestParams } from '@/shared/types/props';
import { Supplier } from '../types/models';

export async function getSuppliersList({ paginationDTO, filterRequestDTO, sort }: DefaultRequestParams) {
  try {
    const { data } = await httpInstance.get('/supplier/filter/page', {
      params: { ...paginationDTO, ...filterRequestDTO, sort },
    });

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function mutateSupplier(supplier: Supplier) {
  try {
    const { data } = !supplier.id
      ? await httpInstance.post('/supplier', supplier)
      : await httpInstance.put(`/supplier/${supplier.id}`, supplier);

    return data;
  } catch (error) {
    handlerHttpError(error);
    throw error;
  }
}
