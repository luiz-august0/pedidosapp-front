import Chip from '@/components/Chip/Chip';
import DataGrid from '@/components/DataGrid/DataGrid';
import { OrderPageResponseDTO } from '@/core/orders/types/dtos';
import { EnumOrderStatus } from '@/core/orders/types/enums';
import { Order } from '@/core/orders/types/models';
import { formatMoney } from '@/helpers/formatters';
import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Dispatch } from 'react';

type Props = {
  list?: OrderPageResponseDTO;
  pagination: GridPaginationModel;
  setPagination: Dispatch<React.SetStateAction<GridPaginationModel>>;
  loading: boolean;
  sort?: GridSortModel;
  setSort?: Dispatch<React.SetStateAction<GridSortModel | undefined>>;
};

export default function OrdersTable({ list, pagination, setPagination, loading, sort, setSort }: Props) {
  const columns: GridColDef<Order>[] = [
    {
      field: 'id',
      headerName: 'Cód.',
      flex: 1,
    },
    {
      field: 'customer.name',
      headerName: 'Cliente',
      valueGetter: (_, row) => {
        return row.customer.name;
      },
      flex: 1,
    },
    {
      field: 'user.login',
      headerName: 'Usuário',
      valueGetter: (_, row) => {
        return row.user?.login;
      },
      flex: 1,
    },
    {
      field: 'amount',
      headerName: 'Valor',
      valueGetter: (params: number) => {
        return formatMoney(params);
      },
      flex: 1,
    },
    {
      field: 'discount',
      headerName: 'Desconto',
      valueGetter: (params: number) => {
        return formatMoney(params);
      },
      flex: 1,
    },
    {
      field: 'addition',
      headerName: 'Acréscimo',
      valueGetter: (params: number) => {
        return formatMoney(params);
      },
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell(params) {
        return <Chip enumParams={EnumOrderStatus[params.value]} />;
      },
      flex: 1,
    },
    {
      field: 'inclusionDate',
      headerName: 'Data',
      valueGetter: (params: string) => {
        return dayjs(params).format('DD/MM/YYYY');
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
      sortingMode="server"
    />
  );
}
