import StandardForm from '@/components/FormTypes/StandardForm';
import { FormButton } from '@/components/FormTypes/types/models';
import { InputMaskField } from '@/components/InputMaskField/InputMaskField';
import { mutateSupplier } from '@/core/suppliers/services/suppliers';
import { Supplier } from '@/core/suppliers/types/models';
import { getDigits } from '@/helpers/general';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Switch, TextField } from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import schemaValidation from './schemaValidation';

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  supplier?: Supplier;
  onSubmitForm?: () => void;
};

export default function SupplierForm({ open, setOpen, supplier, onSubmitForm }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<Supplier>({
    resolver: yupResolver(schemaValidation),
  });

  useEffect(() => {
    if (open) {
      if (supplier) {
        reset(supplier);
      } else {
        reset({
          id: undefined,
          name: '',
          cnpj: '',
          contact: '',
          cpf: '',
          email: '',
          socialReason: '',
          active: true,
        });
      }
    }
  }, [supplier, form, open]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    clearErrors
  } = form;

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: Supplier) => {
    setLoading(true);

    const submitData: Supplier = {
      ...data,
      cnpj: getDigits(data.cnpj ?? ''),
      cpf: getDigits(data.cpf ?? ''),
      contact: getDigits(data.contact ?? ''),
    };

    await mutateSupplier(submitData)
      .then(() => {
        successToast('Fornecedor salvo com sucesso!');
        setLoading(false);
        handleClose();
        onSubmitForm?.();
      })
      .catch(() => setLoading(false));
  };

  const buttons: FormButton[] = [
    {
      id: 'cancel',
      title: 'Cancelar',
      color: 'primary',
      onClick: handleClose,
      variant: 'outlined',
    },
    {
      id: 'submit',
      title: 'Salvar',
      isSubmit: true,
      color: 'primary',
      onClick: handleSubmit(onSubmit),
      loading: loading,
      variant: 'contained',
    },
  ];

  return (
    <FormProvider {...form}>
      <StandardForm
        formButtons={buttons}
        formTitle={supplier ? `Fornecedor #${supplier.id}` : 'Novo'}
        handleClose={handleClose}
        open={open}
      >
        <div className="flex flex-col mt-4 gap-4 items-start">
          <FormControlLabel
            sx={{ margin: '0', marginBottom: '16px' }}
            value="top"
            control={
              <Switch
                checked={watch('active')}
                onChange={() => setValue('active', !watch('active'))}
                name="active"
                color="primary"
                id="supplier-active-switch"
              />
            }
            label="Ativo"
            labelPlacement="top"
          />
          <div className="flex flex-row gap-4 justify-between w-full">
            <TextField
              {...register('name')}
              required
              fullWidth
              id="supplier-name-text"
              label="Nome"
              name="name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              {...register('socialReason')}
              fullWidth
              id="supplier-socialReason-text"
              label="Razão social"
              name="socialReason"
              error={!!errors.socialReason}
              helperText={errors.socialReason?.message}
            />
          </div>
          <TextField
            {...register('email')}
            fullWidth
            id="supplier-email-text"
            label="E-mail"
            name="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <div className="flex flex-row gap-4 justify-between w-full">
            <InputMaskField
              mask="99.999.999/9999-99"
              value={watch('cnpj')}
              onChange={(e) => {
                clearErrors("cnpj");
                setValue('cnpj', e.target.value);
              }}
            >
              {() => (
                <TextField
                  fullWidth
                  id="supplier-cnpj-text"
                  label="CNPJ"
                  name="cnpj"
                  error={!!errors.cnpj}
                  helperText={errors.cnpj?.message}
                />
              )}
            </InputMaskField>
            <TextField
              {...register('cpf')}
              fullWidth
              id="supplier-cpf-text"
              label="CPF"
              name="cpf"
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
          </div>
          <TextField
            {...register('contact')}
            fullWidth
            id="supplier-contact-text"
            label="Contato"
            name="contact"
            error={!!errors.contact}
            helperText={errors.contact?.message}
          />
        </div>
      </StandardForm>
    </FormProvider>
  );
}
