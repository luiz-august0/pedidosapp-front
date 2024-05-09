import * as Icon from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import ProductsTable from "./ProductsTable";
import useProductsListQuery from "./hooks/useProductsListQuery";

export default function Products() {
  const { list, pagination, setPagination, loading } = useProductsListQuery();

  return (
    <div>
      <div className="flex max-xl:flex-col justify-between items-center">
        <div>
          <Typography fontSize={32}>Produtos</Typography>
        </div>
        <div className="flex gap-2 max-xl: mt-5">
          <Button
            startIcon={<Icon.FilterAlt />}
            color="primary"
            variant="outlined"
          >
            Filtrar
          </Button>
          <Button startIcon={<Icon.Add />} color="primary" variant="contained">
            Novo
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <ProductsTable list={list} pagination={pagination} setPagination={setPagination} loading={loading}/>
      </div>
    </div>
  );
}
