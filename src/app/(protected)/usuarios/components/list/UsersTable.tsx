import ActiveChip from '@/components/Chip/ActiveChip';
import DataGrid from '@/components/DataGrid/DataGrid';
import { UserPageResponseDTO } from '@/core/users/types/dtos';
import { User } from '@/core/users/types/models';
import { Avatar, Chip } from '@mui/material';
import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { Dispatch } from 'react';

type Props = {
  list?: UserPageResponseDTO;
  pagination: GridPaginationModel;
  setPagination: Dispatch<React.SetStateAction<GridPaginationModel>>;
  loading: boolean;
  sort?: GridSortModel;
  setSort?: Dispatch<React.SetStateAction<GridSortModel | undefined>>;
  setUser: Dispatch<React.SetStateAction<User | undefined>>;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function UsersTable({
  list,
  pagination,
  setPagination,
  loading,
  sort,
  setSort,
  setUser,
  setOpen,
}: Props) {
  const columns: GridColDef<User>[] = [
    {
      field: 'id',
      headerName: 'Cód.',
      flex: 1,
    },
    {
      field: 'login',
      headerName: 'Usuário',
      flex: 1,
      renderCell(params) {
        return (
          <div className="flex flex-row gap-2 items-center">
            <Avatar src={params.row.photo} />
            {params.value}
          </div>
        );
      },
    },
    {
      field: 'role',
      headerName: 'Tipo',
      renderCell(params) {
        return <Chip label={params.value == 'ADMIN' ? 'Administrador' : 'Funcionário'} sx={{ fontWeight: 'bold' }} />;
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
      onRowClick={(params) => {
        setUser(params.row);
        setOpen(true);
      }}
      sortingMode="server"
    />
  );
}
