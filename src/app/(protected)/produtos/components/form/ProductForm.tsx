import StandardForm from '@/components/FormTypes/StandardForm';
import { FormButton } from '@/components/FormTypes/types/models';
import { mutateProduct } from '@/core/products/services/products';
import { EnumUnitProduct } from '@/core/products/types/enums';
import { Product } from '@/core/products/types/models';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
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

  useEffect(() => {
    if (product) {
      reset(product);
    } else {
      reset({
        id: undefined,
        productSuppliers: undefined,
        description: '',
        active: true,
        unit: 'UNIT',
        unitaryValue: 0,
      });
    }
  }, [product, form]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = form;

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: Product) => {
    setLoading(true);

    await mutateProduct(data)
      .then(() => {
        successToast('Produto salvo com sucesso!');
        setLoading(false);
        onSubmitForm?.();
      })
      .catch(() => setLoading(false));
  };

  const handleClose = () => {
    setOpen(false);
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
      <StandardForm formButtons={buttons} formTitle={product ? `Editar: #${product.id}` : "Novo"} handleClose={handleClose} open={open}>
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
                id='product-active-switch'
              />
            }
            label="Ativo"
            labelPlacement="top"
          />
          <TextField
            {...register('description')}
            required
            fullWidth
            id="product-description-text"
            label="Descrição"
            name="description"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <FormControl fullWidth>
            <InputLabel required>Unidade de medida</InputLabel>
            <Select
              id="product-unit-select"
              label="Unidade de medida"
              name="unit"
              required
              value={watch('unit')}
              onChange={(e) => setValue('unit', e.target.value)}
            >
              {Object.entries(EnumUnitProduct).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            {...register('unitaryValue')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography>R$</Typography>
                </InputAdornment>
              ),
            }}
            required
            fullWidth
            id="product-unitaryValue-text"
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
