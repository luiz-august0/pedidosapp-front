import { handlerHttpError } from '@/helpers/toast';
import { httpInstance } from '@/lib/axios/httpInstance';
import { User } from '../types/models';

export async function mutateAuthenticatedUser(user: User) {
  try {
    const { data } = await httpInstance.put("/user", user);

    return data;
  } catch (error) {
    handlerHttpError(error);
    throw error;
  }
}
