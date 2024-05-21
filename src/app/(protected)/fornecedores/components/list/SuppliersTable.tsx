import ActiveChip from '@/components/Chip/ActiveChip';
import DataGrid from '@/components/DataGrid/DataGrid';
import { SupplierPageResponseDTO } from '@/core/suppliers/types/dtos';
import { Supplier } from '@/core/suppliers/types/models';
import { getDigits } from '@/helpers/general';
import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { maskBr } from 'js-brasil';
import { Dispatch } from 'react';

type Props = {
  list?: SupplierPageResponseDTO;
  pagination: GridPaginationModel;
  setPagination: Dispatch<React.SetStateAction<GridPaginationModel>>;
  loading: boolean;
  sort?: GridSortModel;
  setSort?: Dispatch<React.SetStateAction<GridSortModel | undefined>>;
  setSupplier: Dispatch<React.SetStateAction<Supplier | undefined>>;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function SuppliersTable({ list, pagination, setPagination, loading, sort, setSort, setSupplier, setOpen }: Props) {
  const columns: GridColDef<Supplier>[] = [
    {
      field: 'id',
      headerName: 'Cód.',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      flex: 1,
    },
    {
      field: 'socialReason',
      headerName: 'Razão social',
      flex: 1,
    },
    {
      field: 'cnpj',
      headerName: 'CNPJ',
      flex: 1,
      valueGetter: (params) => maskBr.cnpj(params)
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      flex: 1,
      valueGetter: (params) => maskBr.cpf(params)
    },
    {
      field: 'contact',
      headerName: 'Contato',
      flex: 1,
      valueGetter: (params) => getDigits(params).length > 10 ? maskBr.celular(params) : maskBr.telefone(params)
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
      onRowClick={(params) => {
        setSupplier(params.row);
        setOpen(true);
      }}
      sortingMode='server'
    />
  );
}
