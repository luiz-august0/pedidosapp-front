import StandardForm from '@/components/FormTypes/StandardForm';
import { FormButton } from '@/components/FormTypes/types/models';
import { mutateProduct } from '@/core/products/services/products';
import { EnumUnitProduct } from '@/core/products/types/enums';
import { Product, ProductSupplier } from '@/core/products/types/models';
import { formatMoney } from '@/helpers/formatters';
import { onChangeMoneyInput } from '@/helpers/general';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import { Dispatch, Fragment, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useSuppliersListQuery from '../hooks/useSuppliersListQuery';
import schemaValidation from './schemaValidation';
import Autocomplete from '@/components/Autocomplete/Autocomplete';
import { Supplier } from '@/core/suppliers/types/models';

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  product?: Product;
  onSubmitForm?: () => void;
};

export default function ProductForm({ open, setOpen, product, onSubmitForm }: Props) {
  const { getMore, list: suppliersList, loading: suppliersLoading, search } = useSuppliersListQuery();
  const [unitaryValue, setUnitaryValue] = useState<string>(formatMoney(0));
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<Product>({
    resolver: yupResolver(schemaValidation),
  });

  useEffect(() => {
    if (open) {
      if (product) {
        setUnitaryValue(formatMoney(product?.unitaryValue));
        reset(product);
      } else {
        setUnitaryValue(formatMoney(0));
        reset({
          id: undefined,
          productSuppliers: undefined,
          description: '',
          active: true,
          unit: 'UNIT',
          unitaryValue: 0,
        });
      }

      search(undefined);
    }
  }, [product, form, open]);

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

  const onSubmit = async (data: Product) => {
    setLoading(true);

    await mutateProduct(data)
      .then(() => {
        successToast('Produto salvo com sucesso!');
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
        formTitle={product ? `Produto #${product.id}` : 'Novo'}
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
                id="product-active-switch"
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
            required
            fullWidth
            id="product-unitaryValue-text"
            label="Valor unitário"
            name="unitaryValue"
            error={!!errors.unitaryValue}
            helperText={errors.unitaryValue?.message}
            value={unitaryValue}
            onChange={(e) =>
              onChangeMoneyInput({
                fieldName: 'unitaryValue',
                clearErrors: clearErrors,
                setInputValue: setUnitaryValue,
                setValue: setValue,
                target: e,
              })
            }
          />
          <Autocomplete
            getMore={() => getMore(false)}
            loading={suppliersLoading}
            fullWidth
            multiple
            id="suppliers-autocomplete"
            options={suppliersList?.content ?? []}
            getOptionLabel={(option) => option?.name}
            getOptionKey={(option) => option?.id ?? 0}
            onChange={(_, value, reason) => {
              const newSuppliers = value as Supplier[];

              if (reason == "clear") {
                search(undefined);
              }

              setValue(
                'productSuppliers',
                newSuppliers.map((e) => new Object({ supplier: e }) as ProductSupplier),
              );
            }}
            filterOptions={(options) => options}
            isOptionEqualToValue={(option: any, value: any) => {
              return option.id === value.id;
            }}
            defaultValue={watch('productSuppliers') ? watch('productSuppliers')?.map((e) => e.supplier) : []}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => search(e.target.value)}
                label="Fornecedores"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {suppliersLoading && <CircularProgress color="primary" size={20} />}
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
