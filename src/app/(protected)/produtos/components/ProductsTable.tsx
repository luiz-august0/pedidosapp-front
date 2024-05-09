import { ProductPageResponseDTO } from "@/core/products/types/dtos";
import { EnumUnitProduct } from "@/core/products/enums/enums";
import { Product } from "@/core/products/types/models";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Dispatch } from "react";

type Props = {
  list?: ProductPageResponseDTO;
  pagination: GridPaginationModel;
  setPagination: Dispatch<React.SetStateAction<GridPaginationModel>>;
  loading: boolean;
}

export default function ProductsTable({ list, pagination, setPagination, loading } : Props) {
  const columns: GridColDef<Product>[] = [
    {
      field: "id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
    },
    {
      field: "unit",
      headerName: "Unidade",
      valueGetter: (params: string) => {
        return EnumUnitProduct[params]; 
      },
      flex: 1,
    },
    {
      field: "unitaryValue",
      headerName: "Valor Unitário",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Ativo",
      flex: 1,
    },
  ];

  return (
    <Box sx={{ minHeight: 300, width: "100%" }}>
      <DataGrid
        rows={list?.content ?? []}
        columns={columns}
        paginationModel={pagination}
        onPaginationModelChange={setPagination}
        rowCount={list?.totalElements}
        paginationMode="server"
        pageSizeOptions={(list?.totalElements ?? 0) > 10 ? [10, 25, 50]: [(list?.totalElements ?? 0)]}
        loading={loading}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        autoHeight
      />
    </Box>
  );
}
