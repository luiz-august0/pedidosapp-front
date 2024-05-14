import { Box, Skeleton, SxProps, Theme, useMediaQuery, useTheme } from "@mui/material";
import {
  DataGridProps,
  GridColDef,
  DataGrid as MUIDataGrid,
} from "@mui/x-data-grid";
import { ptBRDataGrid } from "./ptBRLocale";

type Props = {
  onRowClick?: () => void;
  loading?: boolean;
  clientPagination?: boolean;
  rows: any[];
  columns: GridColDef<any>[];
  sx?: SxProps<Theme>;
} & DataGridProps;

export default function DataGrid({
  onRowClick,
  loading,
  clientPagination,
  rows,
  columns,
  sx,
  ...rest
}: Props) {
  const { palette } = useTheme();
  const matchWidth = useMediaQuery("(min-width:768px)");

  return (
    <Box sx={{ minHeight: "350px", width: "100%" }}>
      {loading ? (
        <Skeleton variant="rounded" sx={{ height: "50vh" }} animation="wave" />
      ) : (
        <MUIDataGrid
          sx={{
            "& .MuiDataGrid-columnHeader": {
              border: "none",
              backgroundColor: palette.grey[50],
              fontSize: "1rem !important",
              color: palette.grey[600],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: palette.grey[50],
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              overflowX: "auto",
              overflowY: "hidden",
            },
            "& .MuiDataGrid-virtualScrollerRenderZone": {
              width: "100%",
              position: "unset",
            },
            "& 	.MuiDataGrid-columnHeader:focus-within": {
              outline: "none !important",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "1rem !important",
              color: palette.grey[900],
            },
            "& .MuiDataGrid-row": {
              cursor: onRowClick ? "pointer" : "default",
              "&:first-child": {
                borderTop: "none",
              },
            },
            "& .MuiDataGrid-footerContainer": {
              justifyContent: { xs: "revert", md: "space-between" },
              "& .MuiTablePagination-root": {
                position: { xs: "sticky", sm: "unset" },
                left: { xs: 0, sm: "unset" },
              },
            },
            boxShadow:
              "0px 4px 8px rgba(16, 24, 40, 0.12), 0px 2px 4px rgba(16, 24, 40, 0.08)",
            ...sx,
          }}
          rows={rows}
          columns={columns}
          paginationMode={clientPagination ? "client" : "server"}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          disableColumnResize={matchWidth}
          autoHeight
          localeText={
            ptBRDataGrid.components?.MuiDataGrid.defaultProps.localeText
          }
          {...rest}
        />
      )}
    </Box>
  );
}
