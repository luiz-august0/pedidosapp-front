import AvatarEditor from '@/components/AvatarEditor/AvatarEditor';
import { mutateAuthenticatedUser } from '@/core/users/services/users';
import { User } from '@/core/users/types/models';
import { setMultipartStateFromFile } from '@/helpers/converters';
import { successToast } from '@/helpers/toast';
import { MultipartBean } from '@/shared/types/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import { SyntheticEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import schemaValidation from './schemaValidation';

export default function AuthenticatedUserForm({ user }: { user?: User }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [updatePassword, setUpdatePassword] = useState<boolean>(false);
  const { update, data } = useSession();

  const form = useForm<User>({
    defaultValues: {
      login: user?.login,
      password: undefined,
      photoMultipart: user?.photoMultipart,
    },
    resolver: yupResolver(schemaValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const updateSessionUser = async (user: User) => {
    update({
      ...data,
      user: {
        ...data?.user,
        login: user.login,
        photo: user.photo ?? '',
      },
    });
  };

  const onSubmit = async (data: User) => {
    setLoading(true);

    await mutateAuthenticatedUser(data)
      .then((res: User) => {
        updateSessionUser(res);
        setUpdatePassword(false);
        successToast('Usuário alterado com sucesso!');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handlePhotoChange = (event: SyntheticEvent) => {
    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (file) {
      setMultipartStateFromFile(file, (multipart: MultipartBean) => {
        setValue('photoMultipart', multipart);
      });
    }
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col mt-4 gap-4">
        <div className="flex justify-end">
          <Button onClick={() => setUpdatePassword(true)} variant={'outlined'} color={'primary'}>
            Alterar senha
          </Button>
        </div>
        <div className="flex flex-row justify-between items-center gap-10">
          <div className="flex flex-row">
            <AvatarEditor
              imageUrl={watch('photoMultipart')?.file}
              onChange={handlePhotoChange}
              onRemove={() => setValue('photoMultipart', undefined)}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <TextField
              {...register('login')}
              required
              fullWidth
              id="user-login-text"
              label="Login"
              name="login"
              error={!!errors.login}
              helperText={errors.login?.message}
            />
            {updatePassword && (
              <TextField
                {...register('password')}
                fullWidth
                id="user-password-text"
                label="Nova senha"
                name="password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit(onSubmit)} variant={'contained'} color={'primary'} disabled={loading}>
            Salvar
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
