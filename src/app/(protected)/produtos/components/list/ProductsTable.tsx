import ActiveChip from '@/components/Chip/ActiveChip';
import DataGrid from '@/components/DataGrid/DataGrid';
import { ProductPageResponseDTO } from '@/core/products/types/dtos';
import { EnumUnitProduct } from '@/core/products/types/enums';
import { Product } from '@/core/products/types/models';
import { moneyFormat } from '@/helpers/formatters';
import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { Dispatch } from 'react';

type Props = {
  list?: ProductPageResponseDTO;
  pagination: GridPaginationModel;
  setPagination: Dispatch<React.SetStateAction<GridPaginationModel>>;
  loading: boolean;
  sort?: GridSortModel;
  setSort?: Dispatch<React.SetStateAction<GridSortModel | undefined>>;
};

export default function ProductsTable({ list, pagination, setPagination, loading, sort, setSort }: Props) {
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
      valueGetter: (params: string) => {
        return EnumUnitProduct[params];
      },
      flex: 1,
    },
    {
      field: 'unitaryValue',
      headerName: 'Valor Unitário',
      valueGetter: (params: number) => {
        return moneyFormat(params);
      },
      flex: 1,
    },
    {
      field: 'active',
      headerName: 'Ativo',
      renderCell(params) {
        return <ActiveChip active={params.value} />;
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
    />
  );
}
