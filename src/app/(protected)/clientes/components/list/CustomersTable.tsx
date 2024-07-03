import ActiveChip from '@/components/Chip/ActiveChip';
import DataGrid from '@/components/DataGrid/DataGrid';
import { CustomerPageResponseDTO } from '@/core/customers/types/dtos';
import { Customer } from '@/core/customers/types/models';
import { getDigits } from '@/helpers/general';
import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { maskBr } from 'js-brasil';
import { Dispatch } from 'react';

type Props = {
  list?: CustomerPageResponseDTO;
  pagination: GridPaginationModel;
  setPagination: Dispatch<React.SetStateAction<GridPaginationModel>>;
  loading: boolean;
  sort?: GridSortModel;
  setSort?: Dispatch<React.SetStateAction<GridSortModel | undefined>>;
  setCustomer: Dispatch<React.SetStateAction<Customer | undefined>>;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomersTable({ list, pagination, setPagination, loading, sort, setSort, setCustomer, setOpen }: Props) {
  const columns: GridColDef<Customer>[] = [
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
        setCustomer(params.row);
        setOpen(true);
      }}
      sortingMode='server'
    />
  );
}
