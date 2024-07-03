import { handlerHttpError } from '@/helpers/toast';
import { httpInstance } from '@/lib/axios/httpInstance';
import { DefaultRequestParams } from '@/shared/types/props';
import { EmployeeRequestDTO } from '../types/dtos';

export async function getEmployeesList({ paginationDTO, filterRequestDTO, sort }: DefaultRequestParams) {
  try {
    const { data } = await httpInstance.get('/employee/filter/page', {
      params: { ...paginationDTO, ...filterRequestDTO, sort },
    });

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function mutateEmployee(employeeRequest: EmployeeRequestDTO, id?: number) {
  try {
    const { data } = !id
      ? await httpInstance.post('/employee', employeeRequest)
      : await httpInstance.put(`/employee/${id}`, employeeRequest);

    return data;
  } catch (error) {
    handlerHttpError(error);
    throw error;
  }
}
