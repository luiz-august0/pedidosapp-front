import { httpErrorToast } from '@/core/helpers/toast';
import { httpDefaultInstance, httpInstance } from '@/lib/axios/httpInstance';
import { AxiosError } from 'axios';
import { SessionLogin } from '../types/models';

export async function sessionLogin(session: SessionLogin) {
  const { data } = await httpDefaultInstance.post(
    '/session/login',
    {
      login: session.login,
      password: session.password,
    },
    { headers: { 'X-Tenant': session.tenant } },
  );

  return data;
}

export async function sessionVerify() {
  try {
    const { data } = await httpInstance.get('/session');

    return data;
  } catch (error) {
    httpErrorToast(error as AxiosError);
  }
}
