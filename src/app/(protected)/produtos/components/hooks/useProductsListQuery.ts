import { ProductPageResponseDTO } from "@/core/products/types/dtos";
import { getProductsList } from "@/core/products/services/products";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function useProductsListQuery() {
  const [list, setList] = useState<ProductPageResponseDTO>();
  const [pagination, setPagination] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const getList = async () => {
    setLoading(true);
    const data = await getProductsList({ page: pagination.page, size: pagination.pageSize });

    setList(data);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [pagination]);

  return {
    list,
    pagination,
    setPagination,
    loading
  };
}
