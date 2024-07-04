import { handlerHttpError } from '@/helpers/toast';
import { httpInstance } from '@/lib/axios/httpInstance';
import { DefaultRequestParams } from '@/shared/types/props';
import { Customer } from '../types/models';

export async function getCustomersList({ paginationDTO, filterRequestDTO, sort }: DefaultRequestParams) {
  try {
    const { data } = await httpInstance.get('/customer/filter/page', {
      params: { ...paginationDTO, ...filterRequestDTO, sort },
    });

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function getCustomer({ id }: { id: number }) {
  try {
    const { data } = await httpInstance.get(`/customer/${id}`);

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function mutateCustomer(customer: Customer) {
  try {
    const { data } = !customer.id
      ? await httpInstance.post('/customer', customer)
      : await httpInstance.put(`/customer/${customer.id}`, customer);

    return data;
  } catch (error) {
    handlerHttpError(error);
    throw error;
  }
}
