import Autocomplete from '@/components/Autocomplete/Autocomplete';
import StandardForm from '@/components/FormTypes/StandardForm';
import { FormButton } from '@/components/FormTypes/types/models';
import { InputMaskField } from '@/components/InputMaskField/InputMaskField';
import { Product } from '@/core/products/types/models';
import { mutateSupplier } from '@/core/suppliers/services/suppliers';
import { Supplier } from '@/core/suppliers/types/models';
import { getDigits } from '@/helpers/general';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, FormControlLabel, Switch, TextField } from '@mui/material';
import { Dispatch, Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useProductsListQuery from '../hooks/useProductsListQuery';
import schemaValidation from './schemaValidation';

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  supplier?: Supplier;
  onSubmitForm?: () => void;
};

export default function SupplierForm({ open, setOpen, supplier, onSubmitForm }: Props) {
  const { getMore, list: productsList, loading: productsLoading, search } = useProductsListQuery();
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
          products: undefined,
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
    clearErrors,
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
                clearErrors('cnpj');
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
                  id="supplier-cpf-text"
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
                id="supplier-contact-text"
                label="Contato"
                name="contact"
                error={!!errors.contact}
                helperText={errors.contact?.message}
              />
            )}
          </InputMaskField>
          <Autocomplete
            getMore={() => getMore(false)}
            loading={productsLoading}
            fullWidth
            multiple
            id="products-autocomplete"
            options={productsList?.content ?? []}
            getOptionLabel={(option) => option?.description}
            getOptionKey={(option) => option?.id ?? 0}
            onChange={(_, value: Product[], reason) => {
              if (reason == 'clear') {
                search(undefined);
              }

              setValue('products', value);
            }}
            filterOptions={(options) => options}
            isOptionEqualToValue={(option: any, value: any) => {
              return option.id === value.id;
            }}
            defaultValue={watch('products') ?? []}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => search(e.target.value)}
                label="Produtos"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {productsLoading && <CircularProgress color="primary" size={20} />}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
        </div>
      </StandardForm>
    </FormProvider>
  );
}
