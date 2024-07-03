import StandardForm from '@/components/FormTypes/StandardForm';
import { FormButton } from '@/components/FormTypes/types/models';
import { InputMaskField } from '@/components/InputMaskField/InputMaskField';
import { getDigits } from '@/helpers/general';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Switch, TextField } from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import schemaValidation from './schemaValidation';
import { Customer } from '@/core/customers/types/models';
import { mutateCustomer } from '@/core/customers/services/customers';

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  customer?: Customer;
  onSubmitForm?: () => void;
};

export default function CustomerForm({ open, setOpen, customer, onSubmitForm }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<Customer>({
    resolver: yupResolver(schemaValidation),
  });

  useEffect(() => {
    if (open) {
      if (customer) {
        reset(customer);
      } else {
        reset({
          id: undefined,
          name: '',
          cnpj: '',
          contact: '',
          cpf: '',
          email: '',
          active: true,
        });
      }
    }
  }, [customer, form, open]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    clearErrors,
  } = form;

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: Customer) => {
    setLoading(true);

    const submitData: Customer = {
      ...data,
      cnpj: getDigits(data.cnpj ?? ''),
      cpf: getDigits(data.cpf ?? ''),
      contact: getDigits(data.contact ?? ''),
    };

    await mutateCustomer(submitData)
      .then(() => {
        successToast('Cliente salvo com sucesso!');
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
        formTitle={customer ? `Cliente #${customer.id}` : 'Novo'}
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
                id="customer-active-switch"
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
              id="customer-name-text"
              label="Nome"
              name="name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </div>
          <TextField
            {...register('email')}
            fullWidth
            id="customer-email-text"
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
                clearErrors('cnpj');
                setValue('cnpj', e.target.value);
              }}
            >
              {() => (
                <TextField
                  fullWidth
                  id="customer-cnpj-text"
                  label="CNPJ"
                  name="cnpj"
                  error={!!errors.cnpj}
                  helperText={errors.cnpj?.message}
                />
              )}
            </InputMaskField>
            <InputMaskField
              mask="999.999.999-99"
              value={watch('cpf')}
              onChange={(e) => {
                clearErrors('cpf');
                setValue('cpf', e.target.value);
              }}
            >
              {() => (
                <TextField
                  fullWidth
                  id="customer-cpf-text"
                  label="CPF"
                  name="cpf"
                  error={!!errors.cpf}
                  helperText={errors.cpf?.message}
                />
              )}
            </InputMaskField>
          </div>
          <InputMaskField
            mask="(99) 99999-9999"
            value={watch('contact')}
            onChange={(e) => {
              clearErrors('contact');
              setValue('contact', e.target.value);
            }}
          >
            {() => (
              <TextField
                fullWidth
                id="customer-contact-text"
                label="Contato"
                name="contact"
                error={!!errors.contact}
                helperText={errors.contact?.message}
              />
            )}
          </InputMaskField>
        </div>
      </StandardForm>
    </FormProvider>
  );
}
