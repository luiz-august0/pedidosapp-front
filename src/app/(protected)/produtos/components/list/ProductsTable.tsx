import Chip from '@/components/Chip/Chip';
import DataGrid from '@/components/DataGrid/DataGrid';
import { ProductPageResponseDTO } from '@/core/products/types/dtos';
import { EnumUnitProduct } from '@/core/products/types/enums';
import { Product } from '@/core/products/types/models';
import { formatMoney } from '@/helpers/formatters';
import { EnumDefaultStatus } from '@/shared/types/enums';
import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { Dispatch } from 'react';

type Props = {
  list?: ProductPageResponseDTO;
  pagination: GridPaginationModel;
  setPagination: Dispatch<React.SetStateAction<GridPaginationModel>>;
  loading: boolean;
  sort?: GridSortModel;
  setSort?: Dispatch<React.SetStateAction<GridSortModel | undefined>>;
  setProduct: Dispatch<React.SetStateAction<Product | undefined>>;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductsTable({
  list,
  pagination,
  setPagination,
  loading,
  sort,
  setSort,
  setProduct,
  setOpen,
}: Props) {
  const columns: GridColDef<Product>[] = [
    {
      field: 'id',
      headerName: 'Cód.',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Descrição',
      flex: 1,
    },
    {
      field: 'unit',
      headerName: 'Unidade',
      valueGetter: (params) => {
        return EnumUnitProduct[params].label;
      },
      flex: 1,
    },
    {
      field: 'unitaryValue',
      headerName: 'Valor Unitário',
      valueGetter: (params: number) => {
        return formatMoney(params);
      },
      flex: 1,
    },
    {
      field: 'active',
      headerName: 'Ativo',
      renderCell(params) {
        return <Chip enumParams={EnumDefaultStatus[params.value]} />;
      },
      flex: 1,
    },
  ];

  return (
    <DataGrid
      loading={loading}
      rows={list?.content ?? []}
      columns={columns}
      paginationModel={pagination}
      onPaginationModelChange={setPagination}
      rowCount={list?.totalElements ?? 0}
      pageSizeOptions={(list?.totalElements ?? 0) > 10 ? [10, 25, 50] : [list?.totalElements ?? 0]}
      sortModel={sort}
      onSortModelChange={setSort}
      onRowClick={(params) => {
        setProduct(params.row);
        setOpen(true);
      }}
      sortingMode="server"
    />
  );
}
