import { EnumUnitProduct } from '@/core/products/enums/enums';
import { ProductPageResponseDTO } from '@/core/products/types/dtos';
import { Product } from '@/core/products/types/models';
import { Box, Skeleton, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Dispatch } from 'react';

type Props = {
  list?: ProductPageResponseDTO;
  pagination: GridPaginationModel;
  setPagination: Dispatch<React.SetStateAction<GridPaginationModel>>;
  loading: boolean;
};

export default function ProductsTable({ list, pagination, setPagination, loading }: Props) {
  const { palette } = useTheme();

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
      flex: 1,
    },
    {
      field: 'active',
      headerName: 'Ativo',
      flex: 1,
    },
  ];

  return (
    <Box sx={{ minHeight: 300, width: '100%' }}>
      {loading ? (
        <Skeleton variant="rounded" sx={{ height: '50vh' }} animation="wave" />
      ) : (
        <DataGrid
          sx={{
            '& .MuiDataGrid-columnHeader': {
              border: 'none',
              paddingRight: 24,
              backgroundColor: palette.grey[50],
              fontSize: '1rem !important',
              color: palette.grey[500],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: palette.grey[50],
            },
            '& .MuiDataGrid-virtualScrollerContent': {
              overflowX: 'auto',
              overflowY: 'hidden',
            },
            '& .MuiDataGrid-virtualScrollerRenderZone': {
              width: '100%',
              position: 'unset',
            },
            '& 	.MuiDataGrid-columnHeader:focus-within': {
              outline: 'none !important',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none !important',
            },
            '& .MuiDataGrid-cell': {
              fontSize: '1rem !important',
              color: palette.grey[900],
            },
            '& .MuiDataGrid-row': {
              // cursor: onRowClick ? 'pointer' : 'default',
              '&:first-child': {
                borderTop: 'none',
              },
            },
            '& .MuiDataGrid-footerContainer': {
              justifyContent: { xs: 'revert', md: 'space-between' },
              '& .MuiTablePagination-root': {
                position: { xs: 'sticky', sm: 'unset' },
                left: { xs: 0, sm: 'unset' },
              },
            },
            // boxShadow: !disableShadows
            //   ? '0px 4px 8px rgba(16, 24, 40, 0.12), 0px 2px 4px rgba(16, 24, 40, 0.08)'
            //   : 'unset',
            borderRadius: '8px',
          }}
          rows={list?.content ?? []}
          columns={columns}
          paginationModel={pagination}
          onPaginationModelChange={setPagination}
          rowCount={list?.totalElements ?? 0}
          paginationMode="server"
          pageSizeOptions={(list?.totalElements ?? 0) > 10 ? [10, 25, 50] : [list?.totalElements ?? 0]}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          disableColumnResize
          autoHeight
        />
      )}
    </Box>
  );
}
