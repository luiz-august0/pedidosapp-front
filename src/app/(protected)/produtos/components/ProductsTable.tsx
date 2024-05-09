import { Product } from '@/core/products/types/models';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function ProductsTable() {
  const columns: GridColDef<(Product)>[] = [
    { 
      field: 'id', 
      headerName: 'ID',
      flex: 1
    }
  ];

  return (
    <DataGrid
      rows={[]}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      paginationMode='server'
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25, 50]}
    />
  );
}
