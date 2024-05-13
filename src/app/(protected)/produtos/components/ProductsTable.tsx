import DataGrid from "@/components/DataGrid/DataGrid";
import { moneyFormat } from "@/core/helpers/formatters";
import { EnumUnitProduct } from "@/core/products/enums/enums";
import { ProductPageResponseDTO } from "@/core/products/types/dtos";
import { Product } from "@/core/products/types/models";
import { Chip, useTheme } from "@mui/material";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Dispatch } from "react";

type Props = {
  list?: ProductPageResponseDTO;
  pagination: GridPaginationModel;
  setPagination: Dispatch<React.SetStateAction<GridPaginationModel>>;
  loading: boolean;
};

export default function ProductsTable({
  list,
  pagination,
  setPagination,
  loading,
}: Props) {
  const { palette } = useTheme();

  const columns: GridColDef<Product>[] = [
    {
      field: "id",
      headerName: "Cód.",
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
      valueGetter: (params: number) => {
        return moneyFormat(params);
      },
      flex: 1,
    },
    {
      field: "active",
      headerName: "Ativo",
      renderCell(params) {
        if (params.value) {
          return <Chip label="Ativo" sx={{ backgroundColor: "rgb(209, 250, 223)", color: "rgb(2, 122, 72)", fontWeight: "bold" }} />
        } else {
          return <Chip label="Inativo" sx={{ backgroundColor: "rgb(254, 228, 226)", color: "rgb(180, 35, 24)", fontWeight: "bold" }} />
        }
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
      pageSizeOptions={
        (list?.totalElements ?? 0) > 10
          ? [10, 25, 50]
          : [list?.totalElements ?? 0]
      }
    />
  );
}
