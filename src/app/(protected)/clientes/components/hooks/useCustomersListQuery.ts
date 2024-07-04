import { getCustomersList } from '@/core/customers/services/customers';
import { CustomerPageResponseDTO } from '@/core/customers/types/dtos';
import { convertSortModelToString } from '@/helpers/converters';
import { FilterBuilder } from '@/shared/FilterBuilder';
import { EnumDefaultStatus } from '@/shared/types/enums';
import { debounce } from '@mui/material';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';

export default function useCustomersListQuery() {
  const [list, setList] = useState<CustomerPageResponseDTO>();
  const [pagination, setPagination] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<GridSortModel>();
  const [status, setStatus] = useState<keyof typeof EnumDefaultStatus>('all');
  const [query, setQuery] = useState<string>();

  const getList = async () => {
    setLoading(true);

    const filterBuilder = new FilterBuilder();

    if (status !== 'all') {
      filterBuilder.equals('active', status == 'true');
    }

    if (query) {
      filterBuilder.like('name', query);
    }

    const data = await getCustomersList({
      paginationDTO: { page: pagination.page, size: pagination.pageSize },
      filterRequestDTO: filterBuilder.dto,
      sort: sort ? convertSortModelToString(sort) : 'id,desc',
    });

    setList(data);
    setLoading(false);
  };

  const search = useCallback(debounce(setQuery, 500), []);

  useEffect(() => {
    getList();
  }, [pagination, sort, status, query]);

  return {
    getList,
    list,
    pagination,
    setPagination,
    loading,
    sort,
    setSort,
    status,
    setStatus,
    search,
  };
}
