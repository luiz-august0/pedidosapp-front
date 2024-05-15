import StandardForm from '@/components/FormTypes/StandardForm';
import { FormButton } from '@/components/FormTypes/types/models';
import { mutateProduct } from '@/core/products/services/products';
import { Product } from '@/core/products/types/models';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { Dispatch, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import schemaValidation from './schemaValidation';

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  product?: Product;
  onSubmitForm?: () => void;
};

export default function ProductForm({ open, setOpen, product, onSubmitForm }: Props) {
  const form = useForm<Product>({
    resolver: yupResolver(schemaValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: Product) => {
    setLoading(true);

    await mutateProduct(data)
      .then(() => {
        successToast('Produto salvo com sucesso!');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const buttons: FormButton[] = [
    {
      id: 'cancel',
      title: 'Cancelar',
      color: 'primary',
      onClick: () => {
        setOpen(false);
      },
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
      <StandardForm formButtons={buttons} formTitle="Novo" handleClose={() => setOpen(false)} open={open}>
        <div className="flex flex-col mt-4 gap-4">
          <TextField
            {...register('description')}
            required
            fullWidth
            id="product-description"
            label="Descrição"
            name="description"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            {...register('unit')}
            required
            fullWidth
            id="product-unit"
            label="Unidade de medida"
            name="unit"
            error={!!errors.unit}
            helperText={errors.unit?.message}
          />
          <TextField
            {...register('unitaryValue')}
            required
            fullWidth
            id="product-unitaryValue"
            label="Valor unitário"
            name="unitaryValue"
            type="number"
            error={!!errors.unitaryValue}
            helperText={errors.unitaryValue?.message}
          />
        </div>
      </StandardForm>
    </FormProvider>
  );
}
